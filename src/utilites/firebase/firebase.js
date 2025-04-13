import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAs-NEVbZfQ8SlhDPlouMlP5X1lclCwQ3g",
  authDomain: "social-app-834ec.firebaseapp.com",
  projectId: "social-app-834ec",
  storageBucket: "social-app-834ec.appspot.com",
  messagingSenderId: "562337692200",
  appId: "1:562337692200:web:ec7e298ed50411f2c9931d",
  measurementId: "G-2B86234JQL",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
