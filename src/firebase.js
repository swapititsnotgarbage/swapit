import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 
import { getStorage } from "firebase/storage"; // הוספת ייבוא של Storage

const firebaseConfig = {
  apiKey: "AIzaSyAWX1nmoF5DbEmqpOLrimteHR4fHMcKZy0",
  authDomain: "swapit-app-8641d.firebaseapp.com",
  projectId: "swapit-app-8641d",
  storageBucket: "swapit-app-8641d.firebasestorage.app",
  messagingSenderId: "296895499507",
  appId: "1:296895499507:web:18a8c67fabe07b56227b86",
  measurementId: "G-0MHCNB0YK3"
};

// אתחול פיירבייס
const app = initializeApp(firebaseConfig);

// ייצוא מסד הנתונים, האימות והאחסון לשימוש באפליקציה
export const db = getFirestore(app);
export const auth = getAuth(app); 
export const storage = getStorage(app);