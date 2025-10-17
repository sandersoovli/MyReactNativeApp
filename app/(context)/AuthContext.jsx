import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {
    getApps,
    initializeApp
} from 'firebase/app';
import {
    getReactNativePersistence,
    initializeAuth,
    // Eemaldasime getAuth, sest kasutame initializeAuth
    onAuthStateChanged,
    signInAnonymously,
    signInWithCustomToken
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';

// --- TEIE TEGELIK FIREBASE CONFIG (ASENDATUD) ---
const firebaseConfig = {
    apiKey: "AIzaSyAbeeNd2SceubuiugFvPfX8lARIDpTIIug", 
    authDomain: "furnitureapp-90ee7.firebaseapp.com",
    projectId: "furnitureapp-90ee7",
    storageBucket: "furnitureapp-90ee7.appspot.com",
    messagingSenderId: "571553104195",
    appId: "1:571553104195:android:75d3fd43a3c8cba238eff6"
};

// --- Firebase Initsialiseerimine (Keskne Koht) ---
const app = getApps().length === 0 
    ? initializeApp(firebaseConfig) 
    : getApps()[0];

// KRITILINE: Kasutame initializeAuth, et lubada React Native'is püsivus
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
}); 

export const db = getFirestore(app);

// Loome Auth Contexti
// ESIMENE PARANDUS: createContext algväärtuseks määrame null, mitte {} (või jätame tühjaks)
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Oleku muutujad
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // ALUSTA väärtusega true
    const isAuthenticated = !!user;

    useEffect(() => {
        const authenticateWithCanvasToken = async () => {
            try {
                const token = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

                // Me ootame onAuthStateChanged tulemusi. 
                // Anonüümne sisselogimine on tagavara, kui kedagi pole ja tokenit pole.
                if (!user && !token && !isLoading) {
                   await signInAnonymously(auth);
                } else if (token && isLoading) {
                    // Kasutame tokenit ainult laadimise ajal, et vältida korduvat sisselogimist
                    await signInWithCustomToken(auth, token);
                }

            } catch (e) {
                console.error("Firebase Auth initialization or fallback failed:", e);
            }
        };


        // Seadista autentimise oleku kuulaja
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            // Seadistame isLoading false'iks alles siin
            setIsLoading(false); 
        });
        
        // Kutsume autentimise loogika välja pärast onAuthStateChanged-i seadistamist
        // Kasutan setTimeouti, et anda onAuthStateChangedile hetk aega püsivuse kontrollimiseks
        setTimeout(() => {
            authenticateWithCanvasToken();
        }, 50);

        // Puhasta kuulaja komponendi eemaldamisel
        return () => unsubscribe();
    }, []); 

    // Pakkujast väljastatavad väärtused
    const value = {
        user,
        isLoading,
        isAuthenticated,
        auth, 
        db, 
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook Context'i mugavaks tarbimiseks
export const useAuth = () => {
    const context = useContext(AuthContext);

    // TEINE PARANDUS: Lisa kontroll, et vältida 'undefined' viga
    if (context === undefined || context === null) {
        // Kuigi null on algväärtus, peaks see muutuma AuthProvideri sees. 
        // Kui see on endiselt null, on komponendi paigutusega viga.
        throw new Error('useAuth peab olema kasutatud AuthProvideri sees');
    }

    return context;
};

export default AuthProvider;
