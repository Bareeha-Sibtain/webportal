import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';


const Navbar = () => {

  const navigate = useNavigate();
  const currentUser = useAuth()

  const handleLogout = async () => {
    const auth = getAuth(); // Get the auth instance

    try {
        await signOut(auth); // Use the signOut function with the auth instance
        navigate('/login'); // Navigate to login page after successful logout
        console.log('Logged out successfully');
    } catch (error) {
        console.error('Logout failed:', error); // Handle errors, such as network issues
    }
};


  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="font-bold">TheftGuard</h1>
      <ul className="flex space-x-4">
        {currentUser ? (
          <>
            <li><NavLink to="/home" className={({ isActive }) => isActive ? "text-blue-300" : "text-white"}>Home</NavLink></li>
            <li><NavLink to="/history" className={({ isActive }) => isActive ? "text-blue-300" : "text-white"}>History</NavLink></li>
            <li><NavLink to="/user" className={({ isActive }) => isActive ? "text-blue-300" : "text-white"}>Profile</NavLink></li>
            <li><NavLink to="/settings" className={({ isActive }) => isActive ? "text-blue-300" : "text-white"}>Settings</NavLink></li>
            <li><button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 px-3 py-2 rounded">Logout</button></li>
          </>
        ) : (
          <>
            <li><NavLink to="/login" className={({ isActive }) => isActive ? "text-blue-300" : "text-white"}>Login</NavLink></li>
            <li><NavLink to="/signup" className={({ isActive }) => isActive ? "text-blue-300" : "text-white"}>Signup</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
