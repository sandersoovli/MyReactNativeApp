import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApps, initializeApp } from 'firebase/app';
import {
    getAuth,
    getReactNativePersistence,
    initializeAuth,
    onAuthStateChanged,
    signInAnonymously,
    signOut
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';

// --- Firebase config ---
const firebaseConfig = {
  apiKey: "AIzaSyAbeeNd2SceubuiugFvPfX8lARIDpTIIug",
  authDomain: "furnitureapp-90ee7.firebaseapp.com",
  projectId: "furnitureapp-90ee7",
  storageBucket: "furnitureapp-90ee7.appspot.com",
  messagingSenderId: "571553104195",
  appId: "1:571553104195:android:75d3fd43a3c8cba238eff6"
};

// Firebase init
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Auth init
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  auth = getAuth(app);
}

export const db = getFirestore(app);

// --- Auth Context ---
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!auth) {
      console.error("Firebase Auth object is null.");
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);

      // Auto anon login ainult siis, kui pole ühtegi kasutajat
      if (!currentUser) {
        try {
          await signInAnonymously(auth);
        } catch (e) {
          console.error("Anonüümne login ebaõnnestus:", e);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // NB: profiil näitab ka anonüümseid kasutajaid
  const isAuthenticated = !!user;

  const value = { user, isLoading, auth, db, logout, isAuthenticated };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth peab olema AuthProvideri sees");
  return context;
};

export default AuthProvider;
