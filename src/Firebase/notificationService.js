// notificationService.js
import useLoggedUserInfo from "../Components/hooks/useLoggedUserInfo";
import { messaging } from "./firebase.config";
import { getToken, onMessage } from "firebase/messaging";

export const requestNotificationPermission = async (userId) => {
  // const [loggedUserInfo] = useLoggedUserInfo();
  // const userId = loggedUserInfo._id;
  console.log("userId from callback", userId);
  try {
    const currentToken = await getToken(messaging, {
      vapidKey:
        "BMVGyTFHeZzWF0AClwIqykxfakm2PNcspbWCrYuCRZlsfw5OSQOBX6lVvswhcKPS7nQf8BPVsfvacbnBD4WLRlw",
    });
    if (currentToken) {
      console.log("FCM Token:", currentToken);
      // Save the token to your database associated with the user
      await saveTokenToDatabase(userId, currentToken);
      return currentToken;
    } else {
      console.error(
        "No registration token available. Request permission to generate one."
      );
    }
  } catch (error) {
    console.error("An error occurred while retrieving token. ", error);
  }
};

const saveTokenToDatabase = async (userId, token) => {
  // Implement your logic to save the token in your database
  // For example, send a POST request to your backend API with userId and token
  await fetch("http://localhost:5000/save-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, token }),
  });
};

// Listen for messages
onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // Handle incoming messages (e.g., show a notification)
});
