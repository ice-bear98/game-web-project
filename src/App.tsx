import { useEffect } from "react";
import AppRouter from "./Router/AppRouter";
import { useSetRecoilState } from "recoil";
import { auth } from "./Firebase/FirebaseConfig";
import { LoggedInState } from "./atom/Login";
import { onAuthStateChanged } from "firebase/auth";

function App() {
    const setIsLoggedIn = useSetRecoilState(LoggedInState);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });
    }, [setIsLoggedIn]);
    return (
        <>
            <AppRouter />
        </>
    );
}

export default App;
