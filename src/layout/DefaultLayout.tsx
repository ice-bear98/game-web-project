import Footer from "../component/Footer";
import Header from "../component/Header";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <div className="bg-slate-700  min-h-screen">
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default DefaultLayout;
