import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase/firebase'; // Adjust the import path as necessary

const UserDetail = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    console.log();
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
                console.log(usersList);
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#001529] rounded-md px-6 py-7 ">
                {isLoading ? (
                    <p className='text-white font-bold text-3xl'>Loading...</p>
                ) : users.length > 0 ? (
                    users.map(user => (
                        
                        <div key={user.id} className="bg-white shadow-lg rounded-lg p-4">
                            <p className="text-sm capitalize "><span className='text-base capitalize font-bold text-[#001529]'>Name: </span>{user.name}</p>
                            <p className='text-sm me-9'><span className='text-base capitalize font-bold text-[#001529]'>Email: </span>{user.email}</p>
                            <p className='text-sm me-9'><span className='text-base capitalize font-bold text-[#001529]'>Phone: </span>{user.phone}</p>
                            <p className='text-sm me-9'><span className='text-base capitalize font-bold text-[#001529]'>Location: </span>{user.location}</p>
                        </div>
                    ))
                ) : (
                    <p className='text-white font-bold text-3xl'>No users found.</p>
                )}
            </div>
        </div>
    );
};

export default UserDetail;
