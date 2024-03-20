import Footer from "../component/Footer";
import Header from "../component/Header";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <div>
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default DefaultLayout;
