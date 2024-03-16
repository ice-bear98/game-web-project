import { auth } from "./FirebaseConfig";
import { signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const logout = async () => {
    await signOut(auth);
};

export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
};
