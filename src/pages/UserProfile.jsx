import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase'; // Ensure you import the db object
import { MdEmail } from 'react-icons/md';
import { doc, getDoc, setDoc } from "firebase/firestore";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        await fetchUserData(user.uid);
      } else {
        // Redirect to login page if not logged in
        window.location.href = '/login';
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setName(userData.name || '');
        setEmail(userData.email || '');
        setPhone(userData.phone || '');
        setLocation(userData.location || '');
      }
    } catch (error) {
      console.error('Error fetching user data: ', error);
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    try {
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        phone,
        location,
      }, { merge: true });
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile: ', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="w-[90%] text-white rounded shadow-md px-4 py-9">
      <div className="w-[70%] px-4 text-black rounded">
        <div className="mb-4">
          <label htmlFor="Name" className="text-base text-black font-medium">
            Name:{" "}
          </label>
          <span className="text-base text-black">{name}</span>
        </div>
        <div className="mb-4">
          <label htmlFor="Email" className="text-base text-black font-medium">
            Email:{" "}
          </label>
          <span className="text-base text-black">{email}</span>
        </div>
        <div className="mb-4">
          <label htmlFor="Phone" className="text-base text-black font-medium">
            Phone:{" "}
          </label>
          <span className="text-base text-black">{phone}</span>
        </div>
        <div className="mb-4">
          <label
            htmlFor="Location"
            className="text-base text-black font-medium"
          >
            Location:{" "}
          </label>
          <span className="text-base text-black">{location}</span>
        </div>
        <form className="w-[50%] mt-8 px-4 rounded mb-14">
          <div className="mb-4">
            <label
              htmlFor="Name"
              className="block text-base text-black font-medium mb-2"
            >
              Name:{" "}
            </label>
            <input
              type="text"
              className="w-full px-4 text-base border-2 border-[#888] rounded placeholder:text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Email"
              className="block text-base text-black font-medium mb-2"
            >
              Email:{" "}
            </label>
            <input
              type="email"
              className="w-full px-4 text-base border-2 border-[#888] rounded placeholder:text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Phone"
              className="block text-base text-black font-medium mb-2"
            >
              Phone:{" "}
            </label>
            <input
              type="text"
              className="w-full px-4 text-base border-2 border-[#888] rounded placeholder:text-black"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Phone"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Location"
              className="block text-base text-black font-medium mb-2"
            >
              Location:{" "}
            </label>
            <input
              type="text"
              className="w-full px-4 text-base border-2 border-[#888] rounded placeholder:text-black"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter Location"
            />
          </div>
          <div className="mb-3">
            <button
              type="button"
              className="bg-indigo-400 text-white px-2 rounded py-2"
              onClick={handleUpdateProfile}
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
