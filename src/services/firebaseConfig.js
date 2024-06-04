import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


// Your Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCJ-MXDl1N0cPwtnknsjH1pcUA-IjN6VeE',
  authDomain: 'fithubv1-75f39.firebaseapp.com',
  projectId: 'fithubv1-75f39',
  storageBucket: 'fithubv1-75f39.appspot.com',
  messagingSenderId: '510575989855',
  appId: '1:510575989855:web:e323261c248229d83b37ea',
  measurementId: 'G-F8J5BPH5VC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the authentication instance
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Get the Firestore instance
export const db = getFirestore(app);
