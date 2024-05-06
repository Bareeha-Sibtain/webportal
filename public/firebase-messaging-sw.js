// Import Firebase scripts using importScripts
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4D7F996uEJF03WtStZ4MhxpDLkz0lxLo",
  authDomain: "newapp-50da2.firebaseapp.com",
  databaseURL: "https://newapp-50da2-default-rtdb.firebaseio.com",
  projectId: "newapp-50da2",
  storageBucket: "newapp-50da2.appspot.com",
  messagingSenderId: "478436791531",
  appId: "1:478436791531:web:2d5c6f0f0e2d8eb638daae"
};

// Initialize the Firebase app in the service worker
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so it can handle background messages
const messaging = firebase.messaging();

// Background message handler
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
