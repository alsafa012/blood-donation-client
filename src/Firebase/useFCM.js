// useFCM.js
import { useEffect } from "react";
import axios from "axios";
import { messaging, getToken,onMessage } from "./firebase.config";
// import { onMessage, getToken } from "firebase/messaging";

const saveToken = async (token) => {
  try {
    const userId = "user-id-here"; // Replace with the current user ID
    await axios.post("https://blood-donation-server-ebon.vercel.app/save-token", { userId, token });
    console.log("Token saved successfully:", token);
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

const requestPermission = async () => {
  try {
    await Notification.requestPermission();
    const token = await getToken();
    saveToken(token);
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

const useFCM = () => {
  useEffect(() => {
    requestPermission();
    onMessage((payload) => {
      console.log("Message received. ", payload);
      // Display the notification in the app, if desired
    });
  }, []);
};

export default useFCM;
