import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAldCIBzrF-dbK232lbQPwKL7-jeOt2j6I",
  authDomain: "keepapp-1f08c.firebaseapp.com",
  projectId: "keepapp-1f08c",
  storageBucket: "keepapp-1f08c.appspot.com",
  messagingSenderId: "444258024749",
  appId: "1:444258024749:web:f84f3fa3c79fbfb8b1e7a4",
  measurementId: "G-5PJRLL9L1C"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log(analytics);

const messaging = getMessaging(app);

getToken(messaging)
  .then((currentToken) => {
    if (currentToken) {
      // Use currentToken as needed (e.g., send it to your server)
      console.log(currentToken);
    } else {
      // Show permission request UI
      console.error('No registration token available. Request permission to generate one.');
    }
  })
  .catch((err) => {
    console.error('An error occurred while retrieving token. ', err);
  });
