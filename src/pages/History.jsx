import React, { useEffect, useState } from 'react';
import { ref, onValue } from "firebase/database";
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { realTimeDb, db } from '../firebase/firebase';

const HistoryPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { currentUser } = useAuth();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (currentUser) {
                const userDocRef = doc(db, "users", currentUser.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUserName(userData.name);
                } else {
                    alert("User document not found");
                }
            }
        };

        fetchUserDetails();
    }, [currentUser]);

    useEffect(() => {
        if (!userName) return; // Wait until the username is fetched

        const notificationsRef = ref(realTimeDb, 'Notifications');

        const unsubscribe = onValue(notificationsRef, snapshot => {
            const data = snapshot.val();
            const notificationsList = [];
            if (data) {
                for (const key in data) {
                    if (data[key].name === userName) {
                        notificationsList.push({
                            id: key,
                            ...data[key]
                        });
                    }
                }
            }
            setNotifications(notificationsList);
            setIsLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, [userName]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center mt-4">
            {notifications.length > 0 ? (
                notifications.map(notification => (
                    <div key={notification.id} className="bg-white shadow-lg rounded-lg p-6 mb-4 w-full md:w-1/2">
                        <h3 className="text-lg font-semibold text-gray-900">Action: {notification.action}</h3>
                        <p>Home Key: {notification.homeKey}</p>
                        <p>Timestamp: {notification.timestamp}</p>
                        <p>User: {notification.user}</p>
                    </div>
                ))
            ) : (
                <p>No notifications found.</p>
            )}
        </div>
    );
};

export default HistoryPage;
