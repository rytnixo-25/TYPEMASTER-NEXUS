import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDK6SG_beXnELFuftBM1wEca5UJHxK0m7E",
  authDomain: "typing-master-66797.firebaseapp.com",
  projectId: "typing-master-66797",
  storageBucket: "typing-master-66797.firebasestorage.app",
  messagingSenderId: "152750175891",
  appId: "1:152750175891:web:13e21e3a64dc7f8ace7f66",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const provider = new GoogleAuthProvider();

export default app;