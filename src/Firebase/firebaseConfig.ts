import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

export const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
    authDomain: "game-web-2eb54.firebaseapp.com",
    databaseURL: "https://game-web-2eb54-default-rtdb.firebaseio.com",
    projectId: "game-web-2eb54",
    storageBucket: "game-web-2eb54.appspot.com",
    messagingSenderId: "571594228953",
    appId: "1:571594228953:web:9783c4738c8f57a9a6aac8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const realtimeDb = getDatabase(app);
