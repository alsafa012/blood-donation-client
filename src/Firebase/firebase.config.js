// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getMessaging, onMessage, getToken } from "firebase/messaging";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export default app;
// const vapidKey =
//   "BMVGyTFHeZzWF0AClwIqykxfakm2PNcspbWCrYuCRZlsfw5OSQOBX6lVvswhcKPS7nQf8BPVsfvacbnBD4WLRlw";
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { app, messaging, getToken, onMessage };

// export const requestDMCToken = async () => {
//   return Notification.requestPermission()
//     .then((permission) => {
//       if (permission === "granted") {
//         return getToken(messaging, { vapidKey });
//       } else {
//         throw new Error("Notification not granted");
//       }
//     })
//     .catch((err) => {
//       console.error("Error getting FMC Token", err);
//     });
// };


const vapidKey = "BMVGyTFHeZzWF0AClwIqykxfakm2PNcspbWCrYuCRZlsfw5OSQOBX6lVvswhcKPS7nQf8BPVsfvacbnBD4WLRlw";

// Request token
export const requestForToken = () => {
  return getToken(messaging, { vapidKey })
    .then((currentToken) => {
      if (currentToken) {
        console.log("Token received:", currentToken);
      } else {
        console.log("No registration token available.");
      }
    })
    .catch((err) => {
      console.error("Error getting token:", err);
    });
};

// Listen for foreground messages
export const onMessageListener = () => {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Foreground message received:", payload);
      resolve(payload);
    });
  });
};

// export const requestForToken = () => {
//   return getToken(messaging, {
//     vapidKey:
//       "BMVGyTFHeZzWF0AClwIqykxfakm2PNcspbWCrYuCRZlsfw5OSQOBX6lVvswhcKPS7nQf8BPVsfvacbnBD4WLRlw",
//   })
//     .then((currentToken) => {
//       if (currentToken) {
//         console.log("Token client", currentToken);
//       } else {
//         console.log("no registration token");
//       }
//     })
//     .catch((err) => {
//       console.log("error while register token", err);
//     });
// };

// export const onMessageListener = () => {
//   return new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       console.log("onMessage payload", payload);

//       resolve(payload);
//     });
//   });
// };
