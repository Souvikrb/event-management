import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDBvamcQjyVx7CYBoPIMXnDgso8YqqzQoc",
  authDomain: "notification-832c2.iam.gserviceaccount.com",
  projectId: "notification-832c2",
  storageBucket: "notification-832c2.firebasestorage.app",
  messagingSenderId: "650101202176",
  appId: "1:650101202176:android:564f2bf062d2758ff067e5",
};

const firebaseApp  = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp );

export const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, { vapidKey: 'BGRf5Xpw_3_OtQKoGoBarU6ekcbVGEsgUHFG0JzNf-rk9F70TqT20O79L2T_fiuHsOkdKh_2pGqw_iDGwHxzf24' });
    if (currentToken) {
      console.log('Token:', currentToken);
      sessionStorage.setItem('notificationToken',currentToken);

      return currentToken;
    } else {
      console.log('No registration token available.');
    }
  } catch (error) {
    console.error('Error getting token:', error);
  }
  
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
