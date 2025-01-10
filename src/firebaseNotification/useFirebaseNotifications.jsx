import { useEffect } from 'react';
import { requestForToken, onMessageListener } from './firebase-config';

const useFirebaseNotifications = () => {
  useEffect(() => {
    // Request token when the component mounts
    requestForToken();

    // Set up foreground message listener
    onMessageListener()
      .then((payload) => {
        if (Notification.permission === "granted") {
          new Notification(payload.notification.title, { body: payload.notification.body });
        }
        if (Notification.permission !== "granted") {
          Notification.requestPermission().then((permission) => {
            if (permission !== "granted") {
              console.error("Notification permission denied.");
            }
          });
        }
        console.log('Received foreground notification:', payload);
      })
      .catch((err) => console.error('Error:', err));
  }, []);
  const SendAgain = () => {
    // Request token when the component mounts
    requestForToken();

    // Set up foreground message listener
    onMessageListener()
      .then((payload) => {
        if (Notification.permission === "granted") {
          new Notification(payload.notification.title, { body: payload.notification.body });
        }
        if (Notification.permission !== "granted") {
          Notification.requestPermission().then((permission) => {
            if (permission !== "granted") {
              console.error("Notification permission denied.");
            }
          });
        }
        console.log('Received foreground notification:', payload);
      })
      .catch((err) => console.error('Error:', err));
  }
  return { SendAgain };
};

export default useFirebaseNotifications;
