import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase'; // Adjust the import path as necessary

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersCollection = collection(db, 'users'); // Ensure your collection name is correct
            const userSnapshot = await getDocs(usersCollection);
            const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(userList);
        };

        fetchUsers();
    }, []);

    return (
        <div className='flex justify-center items-center mx-auto mt-20 px-4 sm:px-6 lg:px-8'>
            <div className='w-full overflow-x-auto'>
                <table className="border-collapse border border-slate-400 w-full">
                    <thead>
                        <tr>
                            <th className="border border-slate-300 px-2 sm:px-4 py-2 sm:py-5 bg-indigo-600 text-white">User Name</th>
                            <th className="border border-slate-300 px-2 sm:px-4 py-2 sm:py-5 bg-indigo-600 text-white">User Email</th>
                            <th className="border border-slate-300 px-2 sm:px-4 py-2 sm:py-5 bg-indigo-600 text-white">User Phone</th>
                            <th className="border border-slate-300 px-2 sm:px-4 py-2 sm:py-5 bg-indigo-600 text-white">User Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="border border-slate-300 px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-base">{user.name}</td>
                                <td className="border border-slate-300 px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-base">{user.email}</td>
                                <td className="border border-slate-300 px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-base">{user.phone}</td>
                                <td className="border border-slate-300 px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-base">{user.location}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;
