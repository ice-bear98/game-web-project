import { useEffect } from "react";
import AppRouter from "./Router/AppRouter";
import { useSetRecoilState } from "recoil";
import { auth } from "./Firebase/FirebaseConfig";
import { LoggedInState } from "./atom/Login";
import { onAuthStateChanged } from "firebase/auth";
import { userState } from "./atom/UserLoginState";

function App() {
    const setIsLoggedIn = useSetRecoilState(LoggedInState);
    const setUserState = useSetRecoilState(userState);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
            setUserState(user ? { uid: user.uid, email: user.email } : null);
        });
    }, [setIsLoggedIn, setUserState]);
    return (
        <>
            <AppRouter />
        </>
    );
}

export default App;
