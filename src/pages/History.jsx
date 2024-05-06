import React, { useEffect, useState } from 'react';
import { ref, onValue } from "firebase/database";
import { useAuth } from '../context/AuthContext'; // Make sure this is correctly imported
import { realTimeDb } from '../firebase/firebase'; // Ensure this is correctly imported

const HistoryPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const { currentUser } = useAuth();

    useEffect(() => {
        const notificationsRef = ref(realTimeDb, 'Notifications');

        const unsubscribe = onValue(notificationsRef, snapshot => {
            const data = snapshot.val();
            const notificationsList = [];
            if (data) {
                for (const key in data) {
                    if (data[key].user === currentUser.displayName) {
                        notificationsList.push({
                            id: key,
                            ...data[key]
                        });
                    }
                }
            }
            setNotifications(notificationsList);
            setIsLoading(false); // Update loading state
        }, {
            onlyOnce: true // Fetch data only once; remove if continuous sync is needed
        });

        return () => {
            unsubscribe();
        };
    }, [currentUser]);

    if (isLoading) {
        return <div>Loading...</div>; // Display loading indicator
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
                <p>No notifications found.</p> // Handle empty state
            )}
        </div>
    );
};

export default HistoryPage;
