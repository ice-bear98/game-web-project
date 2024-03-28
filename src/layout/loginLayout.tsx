import { Outlet } from "react-router-dom";

const LoginLayout = () => {
    return (
        <div className="bg-slate-700 ">
            <Outlet />
        </div>
    );
};

export default LoginLayout;
