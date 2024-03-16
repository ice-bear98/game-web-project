// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyAS_b5ZHieO1nr5ruq-vrKwsViWlnIxpTc",
    authDomain: "game-web-2eb54.firebaseapp.com",
    projectId: "game-web-2eb54",
    storageBucket: "game-web-2eb54.appspot.com",
    messagingSenderId: "571594228953",
    appId: "1:571594228953:web:b01be92fd63bb164a6aac8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
