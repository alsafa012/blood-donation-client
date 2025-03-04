import { useEffect, useState } from "react";
import Blogs from "../../Components/Blogs/Blogs";
import Banner from "../../Components/Header/Banner";
import ReviewSection from "../../Components/ReviewSection/ReviewSection";
import MyContainer from "../../Shared/MyContainer";
import WebsiteTitle from "../../Shared/WebsiteTitle";
// import { requestNotificationPermission } from "../../Firebase/notificationService";
// import useLoggedUserInfo from "../../Components/hooks/useLoggedUserInfo";
import {
  onMessageListener,
  requestForToken,
} from "../../Firebase/firebase.config";
import Reviews from "./Reviews";
import AvailableDonorNavigate from "./AvailableDonorNavigate";

const HomePage = () => {
  // const [loggedUserInfo] = useLoggedUserInfo();
  // const userId = loggedUserInfo._id;
  // console.log(userId);
  // useEffect(() => {
  //   // if (userId) {
  //     // console.log("userId inside",userId);

  //     requestNotificationPermission(userId);
  //   // }
  // }, [userId]);
  // const notify = () => {
  //   Notification.requestPermission().then((permission) => {
  //     // If the user accepts, let's create a notification
  //     console.log("permission", permission);
  //     if (permission === "granted") {
  //       const notification = new Notification("Hi there!");
  //       console.log("object", notification);
  //       // …
  //     }
  //   });
  //   console.log("object");
  // };

  // const notify = () => {

  // requestDMCToken()
  // if (!("Notification" in window)) {
  //   // Check if the browser supports notifications
  //   alert("This browser does not support desktop notification");
  // } else if (Notification.permission === "granted") {
  //   // Check whether notification permissions have already been granted;
  //   // if so, create a notification
  //   const notification = new Notification("Hi there!");
  //   console.log("notification", notification);
  //   // …
  // } else if (Notification.permission !== "denied") {
  //   // We need to ask the user for permission
  //   Notification.requestPermission().then((permission) => {
  //     console.log("permission", permission);
  //     // If the user accepts, let's create a notification
  //     if (permission === "granted") {
  //       const notification = new Notification("Hi there!");
  //       console.log("notification", notification);
  //     }
  //   });
  // }

  //   // At last, if the user has denied notifications, and you
  //   // want to be respectful there is no need to bother them anymore.
  // };

  // notify()
  const [notification, setNotification] = useState({ title: "", body: "" });

  // Request notification permission
  // const handleNotificationPermission = () => {
  //   requestNotificationPermission();
  // };

  // // Register the service worker and request notification permission
  // useEffect(() => {
  //   // Check if service worker is available in the browser
  //   if ("serviceWorker" in navigator) {
  //     // Register the service worker
  //     console.log("serviceWorker working");
  //     navigator.serviceWorker
  //       .register("/firebase-messaging-sw.js")
  //       .then((registration) => {
  //         console.log("Service Worker registered:", registration);
  //       })
  //       .catch((error) => {
  //         console.error("Service Worker registration failed:", error);
  //       });
  //   }
  //   // console.log("serviceWorker not working");

  //   // Request notification permission
  //   // handleNotificationPermission();

  //   // Request FCM token on page load
  //   requestForToken();

  //   // Set up message listener to handle foreground notifications
  //   onMessageListener()
  //   .then((payload) => {
  //     console.log("onMessageListener from homepage");
  //     console.log("payload",payload);
  //     setNotification({
  //       title: payload.notification.title,
  //       body: payload.notification.body,
  //     });
  //   });
  // }, []); // Empty dependency array to run only once on mount
  useEffect(() => {
    // Register the service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }

    // Request the FCM token
    requestForToken();

    // Set up foreground notification listener
    onMessageListener()
      .then((payload) => {
        console.log(
          "onMessageListener - foreground message received:",
          payload
        );
        // Ensure payload has the correct structure
        if (payload?.notification) {
          setNotification({
            title: payload.notification.title,
            body: payload.notification.body,
          });
        }
      })
      .catch((error) => {
        console.error("Error in onMessageListener:", error);
      });

    // Notification.requestPermission().then((permission) => {
    //   if (permission === "granted") {
    //     console.log("Notification permission granted.");
    //     const notifications = new Notification(notification);
    //     console.log(notifications);
    //   } else {
    //     console.log("Notification permission denied.");
    //   }
    // });
  }, [notification]);

  // Show notification when the notification state changes
  useEffect(() => {
    if (notification.title) {
      alert(`${notification.title}: ${notification.body}`);
    }
  }, [notification]);
  // const requestNotificationPermission = () => {
  //   Notification.requestPermission().then((permission) => {
  //     if (permission === "granted") {
  //       console.log("Notification permission granted.");
  //       const notifications = new Notification(notification);
  //       console.log(notifications);
  //     } else {
  //       console.log("Notification permission denied.");
  //     }
  //   });
  // };

  //   const [notification, setNotification] = useState({ title: "", body: "" });
  //   console.log("notification", notification);
  // const notify = ()=>{
  //   alert(`${notification.title} and ${notification.body}`)
  // }
  //   useEffect(()=>{

  //     if(notification.title){
  //       notify()
  //     }
  //   },[notification])
  //   requestForToken()
  //   onMessageListener()
  //   .then(payload=>{
  //     setNotification({title:payload.notification.title,body:payload.notification.body})
  //   })

  return (
    <MyContainer>
      <WebsiteTitle name={"Hope || Home"} />
      <button
        className="p-4 bg-gray-200"
        // onClick={requestNotificationPermission}
      >
        Click
      </button>
      <Banner />
      <Reviews />
      <ReviewSection />
      <div className="my-10">
        <img
          src="https://i.ibb.co/BHZ7rPVK/blood-3.jpg"
          className="mx-auto"
          alt=""
        />
      </div>
      <AvailableDonorNavigate />
      <Blogs />
    </MyContainer>
  );
};

export default HomePage;
