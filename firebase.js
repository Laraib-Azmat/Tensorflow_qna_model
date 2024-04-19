// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFz7eODsl_WWw_xmbBUexkMLb1LL29REQ",
  authDomain: "fir-18cab.firebaseapp.com",
  projectId: "fir-18cab",
  storageBucket: "fir-18cab.appspot.com",
  messagingSenderId: "892500224456",
  appId: "1:892500224456:web:e425c088d90a71948eb8fd",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// export const auth = getAuth(firebaseApp);
export const auth = getAuth(firebaseApp);

export const storage = getStorage(firebaseApp);

export const db = getFirestore(firebaseApp);
