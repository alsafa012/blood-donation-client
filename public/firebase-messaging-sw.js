// // importScripts(
// //   "https://www.gstatic.com/firebasejs/9.6.7/firebase-app-compat.js"
// // );
// // importScripts(
// //   "https://www.gstatic.com/firebasejs/9.6.7/firebase-messaging-compat.js"
// // );
// // // import { initializeApp } from "firebase/app";
// // const firebaseConfig = {
// //   apiKey: import.meta.env.VITE_APIKEY,
// //   authDomain: import.meta.env.VITE_AUTHDOMAIN,
// //   projectId: import.meta.env.VITE_PROJECTID,
// //   storageBucket: import.meta.env.VITE_STORAGEBUCKET,
// //   messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
// //   appId: import.meta.env.VITE_APPID,
// // };
// // firebase.initializeApp(firebaseConfig);
// // const messaging = firebase.messaging();

// // messaging.onBackgroundMessage((payload) => {
// //   console.log("receive background msg", payload);
// //   const notificationTitle = payload.notification.title;
// //   const notificationOptions = {
// //     body: payload.notification.body,
// //     icon: "/firebase-logo.png",
// //   };
// //   console.log("notificationTitle", notificationTitle);
// //   self.registration.showNotification(notificationTitle, notificationOptions);
// // });

// importScripts(
//   "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
// );
// importScripts(
//   "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
// );

// firebase.initializeApp({
//   apiKey: "AIzaSyAlk0SsMqhC_Cf21It-DhiDX-B6RikbT4Y",
//   authDomain: "hope-ef191.firebaseapp.com",
//   projectId: "hope-ef191",
//   storageBucket: "hope-ef191.appspot.com",
//   messagingSenderId: "872490700793",
//   appId: "1:872490700793:web:f844e50b3daa4d997ef728"
// //   apiKey: import.meta.env.VITE_APIKEY,
// //   authDomain: import.meta.env.VITE_AUTHDOMAIN,
// //   projectId: import.meta.env.VITE_PROJECTID,
// //   storageBucket: import.meta.env.VITE_STORAGEBUCKET,
// //   messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
// //   appId: import.meta.env.VITE_APPID,
// });

// const messaging = firebase.messaging();

// // Handle background message
// messaging.onBackgroundMessage((payload) => {
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: "/firebase-logo.png",
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAlk0SsMqhC_Cf21It-DhiDX-B6RikbT4Y",
  authDomain: "hope-ef191.firebaseapp.com",
  projectId: "hope-ef191",
  storageBucket: "hope-ef191.appspot.com",
  messagingSenderId: "872490700793",
  appId: "1:872490700793:web:f844e50b3daa4d997ef728",
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
