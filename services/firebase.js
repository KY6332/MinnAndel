// Firebase's web config is NOT a secret; Firestore rules enforce access.
// The OpenAI secret must never be stored in this file or in EXPO_PUBLIC_* variables.
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const config = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};
export const firebaseReady = Boolean(config.apiKey && config.projectId && config.appId);
const app = firebaseReady ? (getApps().length ? getApp() : initializeApp(config)) : null;
let auth = null;
if (app) {
  try {
    // Persist login between app launches on iOS and Android.
    auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
  } catch (err) {
    // Expo Fast Refresh may initialize Auth more than once.
    if (err.code === 'auth/already-initialized') auth = getAuth(app);
    else throw err;
  }
}
export { auth };
export const db = app ? getFirestore(app) : null;
export const cloudFunctions = app ? getFunctions(app, 'europe-west1') : null;
