import React, { useEffect, useState } from 'react';
import { ref, onValue } from "firebase/database";
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { realTimeDb, db } from '../firebase/firebase';
import Spinner from '../component/Spinner';

const HistoryPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { currentUser } = useAuth();
    const notificationsRef = ref(realTimeDb, 'Notifications');

    useEffect(() => {
        if (!currentUser) return; // Wait until the username is fetched

        const unsubscribe = onValue(notificationsRef, snapshot => {
            const data = snapshot.val();
            const notificationsList = [];
            if (data) {
                for (const key in data) {
                    if (data[key].uid === currentUser.uid) {
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
    }, [currentUser]);

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="flex flex-col items-center justify-center mt-4">
            <h2 className='text-xl text-black mb-5 font-bold'>Notification History</h2>
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
                <p className='text-base  bg-indigo-400 px-3 py-2 rounded text-white animate-pulse'>No notifications found.</p>
            )}
        </div>
    );
};


export default HistoryPage;
