import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase/firebase'; // Adjust the import path as necessary

const UserDetail = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersCollectionRef = collection(db, 'users');
            try {
                const querySnapshot = await getDocs(usersCollectionRef);
                const usersList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUsers(usersList);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error);
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {isLoading ? (
                    <p>Loading...</p>
                ) : users.length > 0 ? (
                    users.map(user => (
                        <div key={user.id} className="bg-white shadow-lg rounded-lg p-4">
                            <h2 className="text-xl font-bold">{user.displayName}</h2>
                            <p>{user.email}</p>
                            <p>{user.phone}</p>
                            <p>{user.location}</p>
                        </div>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </div>
    );
};

export default UserDetail;
