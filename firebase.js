// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "Your api",
  authDomain: "f...",
  projectId: "project id here",
  storageBucket: "Your bucket",
  messagingSenderId: "your id",
  appId: "Your id",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// export const auth = getAuth(firebaseApp);
export const auth = getAuth(firebaseApp);

export const storage = getStorage(firebaseApp);

export const db = getFirestore(firebaseApp);
