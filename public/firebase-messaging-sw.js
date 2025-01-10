importScripts('https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js');

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDBvamcQjyVx7CYBoPIMXnDgso8YqqzQoc",
    authDomain: "notification-832c2.iam.gserviceaccount.com",
    projectId: "notification-832c2",
    storageBucket: "notification-832c2.firebasestorage.app",
    messagingSenderId: "650101202176",
    appId: "1:650101202176:android:564f2bf062d2758ff067e5",
  };

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
