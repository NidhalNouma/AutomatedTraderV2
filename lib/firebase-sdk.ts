import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

 const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "auth.automatedtrader.com",
  // authDomain: "automated-trader-fd733.firebaseapp.com",
  projectId: "automated-trader-fd733",
  storageBucket: "automated-trader-fd733.appspot.com",
  messagingSenderId: "1097394175779",
  appId: "1:1097394175779:web:5b307b63f15c80f73bd696",
  measurementId: "G-N59NRR3N6T",
 };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

