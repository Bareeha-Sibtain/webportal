import React, { useEffect, useState } from 'react';
import { auth, realTimeDb, db } from '../firebase/firebase'; // Ensure Firestore is imported
import { ref, onValue, off, push, set } from "firebase/database"; // Import the set function
import { doc, getDoc } from 'firebase/firestore';
import History from '../pages/History';

const NotificationModal = ({ show, title, message, name, location, currentUser, onAction }) => {
  if (!show) return null;

  const isCurrentUserMatch = currentUser.name === name && currentUser.location === location;

  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0,0,0,0.2)' }}>
      <h4 className='text-xl font-bold text-red-500'>{title}</h4>
      <p className='text-sm text-[#777] font-semibold'>{message}</p>
      <p className='text-sm text-[#777] font-semibold'>{name}</p>
      <p className='text-sm text-[#777] font-semibold'>{location}</p>
      {isCurrentUserMatch && (
        <div className="flex gap-5 justify-center items-center mt-5">
          <button onClick={() => onAction('accept')} className='w-100 py-1 px-2 text-center text-white capitalize bg-green-800 ms-4 rounded'>Accept</button>
          <button onClick={() => onAction('dismiss')} className='w-100 py-1 px-2 text-center text-white capitalize bg-red-600 ms-4 rounded'>Dismiss</button>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState({ title: '', message: '', name: '', location: '' });
  const [currentUser, setCurrentUser] = useState({ name: '', location: '' });
  const [notificationTimeout, setNotificationTimeout] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async user => {
      if (user) {
        // Fetch additional user details from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setCurrentUser({
            name: userData.name || 'Unknown',
            location: userData.location || 'Unknown'
          });
        } else {
          setCurrentUser({
            name: user.displayName || 'Unknown',
            location: 'Unknown'
          });
        }
      } else {
        // No user is signed in
        setCurrentUser({ name: '', location: '' });
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    // Realtime Database reference for devices
    const deviceRef = ref(realTimeDb, 'Device');
    const onDeviceChange = onValue(deviceRef, snapshot => {
      const devices = snapshot.val();
      console.log("Devices snapshot received at:", new Date().toISOString());
      console.log("Devices data:", devices); // Log the entire devices object

      for (let home in devices) {
        const device = devices[home];
        if (!device) continue; // Skip if device is undefined

        const motion = device.motion && device.motion.value !== undefined ? device.motion.value : 'undefined';
        const sound = device.sound && device.sound.value !== undefined ? device.sound.value : 'undefined';
        const user = device.user ? device.user : { name: 'unknown', location: 'unknown' };

        console.log(`Home: ${home}`);
        console.log(`Motion: ${motion}, Sound: ${sound}, User:`, user); // Log details of each device

        if (motion === 1 || sound === 1) {
          setNotification({
            title: 'Alert',
            message: motion === 1 ? `Motion detected at ${home}.` : `Sound detected at ${home}.`,
            name: user.name,
            location: user.location
          });
          setShowModal(true);

          // Set a timeout to automatically mark as "missed" after 1 hour
          const timeout = setTimeout(() => {
            saveNotification('missed');
          }, 3600000); // 1 hour in milliseconds
          setNotificationTimeout(timeout);
        }
      }
    });

    return () => off(deviceRef, 'value', onDeviceChange);
  }, []);

  const saveNotification = (action) => {
    const notificationRef = ref(realTimeDb, 'Notifications');
    const newNotificationRef = push(notificationRef); // Generate a new unique ID
    set(newNotificationRef, {
      ...notification,
      action,
      timestamp: new Date().toISOString()
    }).then(() => {
      console.log(`Notification ${action} saved at:`, new Date().toISOString());
    }).catch(error => {
      console.error("Error saving notification:", error);
    });

    setShowModal(false);
    clearTimeout(notificationTimeout); // Clear the timeout if action is taken
  };

  const handleAction = (action) => {
    saveNotification(action);
  };

  return (
    <>
      <NotificationModal
        show={showModal}
        title={notification.title}
        message={notification.message}
        name={notification.name}
        location={notification.location}
        currentUser={currentUser}
        onAction={handleAction}
      />
      <div className="mt-[15%]">
        <History />
      </div>
    </>
  );
};

export default Header;
