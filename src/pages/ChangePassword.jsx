import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { toast } from 'react-toastify';

const ChangePassword = () => {
    const { currentUser } = useAuth();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            // Create credential with the old password
            const credential = EmailAuthProvider.credential(
                currentUser.email,
                oldPassword
            );

            // Reauthenticate the user with the credential
            await reauthenticateWithCredential(currentUser, credential);

            // If reauthentication succeeds, update the password
            await updatePassword(currentUser,newPassword);
            setSuccessMessage("Password updated successfully");
            setOldPassword('');
            setNewPassword('');
            toast.success("New Password Updated")
        } catch (error) {
            setError(error.message);
            toast.error(error.message)
        }
    };

    return (
        <div className='flex flex-col md:flex-col mx-auto md:mx-0 md:justify-start md:items-start justify-center items-center shadow rounded w-11/12 sm:w-1/2 md:w-[30%] px-3 py-4'>
            <h2 className='text-sm md:text-base font-bold capitalize'>Change Password</h2>
            {error && <div>{error}</div>}
            {successMessage && <div>{successMessage}</div>}
            <form onSubmit={handleSubmit} className='flex flex-col justify-start mt-5'>
                <div className="mb-5 flex flex-col">
                    <label htmlFor='oldPassword' className="text-base text-black font-medium">Old Password:</label>
                    <input id='oldPassword' className="w-full px-4 text-base border-2 border-[#888] rounded placeholder:text-black" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
                </div>
                <div className="mb-5 flex flex-col">
                    <label htmlFor='newPassword' className="text-base text-black font-medium">New Password:</label>
                    <input id='newPassword' className="w-full px-4 text-base border-2 border-[#888] rounded placeholder:text-black" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                </div>
                <div className="mb-5">
                    <button type="submit" className='bg-indigo-400 text-white capitalize px-2 rounded py-1'>Change Password</button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;