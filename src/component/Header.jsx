import React, { useEffect, useState } from 'react';
import { auth, db, realTimeDb } from '../firebase/firebase'; // db should be Firestore instance
import { doc, onSnapshot } from 'firebase/firestore'; // Importing from Firestore
import { ref, onValue, off } from "firebase/database"; // Importing from Realtime Database

const NotificationModal = ({ show, title, message }) => {
  if (!show) return null;

  return (
    <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0,0,0,0.2)' }}>
      <h4>{title}</h4>
      <p>{message}</p>
    </div>
  );
};

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState({ title: '', message: '' });

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // Firestore reference for user location
    const userDocRef = doc(db, 'users', user.uid);
    
    const unsubscribeUser = onSnapshot(userDocRef, (doc) => {
      const userData = doc.data();
      const userLocation = userData ? userData.location : 'unknown';

      // Realtime Database reference for devices
      const deviceRef = ref(realTimeDb, 'Device');
      const onDeviceChange = onValue(deviceRef, snapshot => {
        const devices = snapshot.val();
        for (let home in devices) {
          const { motion, sound } = devices[home];
          if (motion.value === 1 || sound.value === 1) {
            setNotification({
              title: 'Alert',
              message: `Motion detected at ${home}. Location: ${userLocation}`
            });
            setShowModal(true);
          }
        }
      });

      return () => off(deviceRef, 'value', onDeviceChange);
    });

    return () => unsubscribeUser(); // Cleanup Firestore listener
  }, []);

  return (
    <>
      <NotificationModal
        show={showModal}
        title={notification.title}
        message={notification.message}
      />
    </>
  );
};

export default Header;
