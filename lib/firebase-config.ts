/**
 * Firebase Configuration and Initialization
 * Handles Firebase setup for Firestore database
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCIemfZ_ZFu5gB8Y8-n-SIwqzWu37qHHmI",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "ykpegypt.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "ykpegypt",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "ykpegypt.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "18574723081",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:18574723081:web:8a70ecce4028b1da2350d8",
};

// Initialize Firebase
let app: FirebaseApp;
let db: Firestore;

if (typeof window !== 'undefined') {
  // Client-side initialization
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  db = getFirestore(app);
} else {
  // Server-side initialization
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  db = getFirestore(app);
}

export { db };
export default app;
