import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApps, initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAbeeNd2SceubuiugFvPfX8lARIDpTIIug",
  authDomain: "furnitureapp-90ee7.firebaseapp.com",
  projectId: "furnitureapp-90ee7",
  storageBucket: "furnitureapp-90ee7.appspot.com",
  messagingSenderId: "571553104195",
  appId: "1:571553104195:android:75d3fd43a3c8cba238eff6"
};

// Initsialiseerime app ainult, kui pole juba loodud
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// InitializeAuth KORRA
let auth;
try {
  auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
} catch (err) {
  // Kui auth on juba initsialiseeritud, võtame olemasoleva
  if (err.code === 'auth/already-initialized') {
    import('firebase/auth').then(f => {
      auth = f.getAuth(app);
    });
  } else {
    throw err;
  }
}

export { auth };
export const db = getFirestore(app);
export default app;
