import Header from "../component/Header";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <div>
                <Outlet />
            </div>
        </>
    );
};

export default DefaultLayout;
