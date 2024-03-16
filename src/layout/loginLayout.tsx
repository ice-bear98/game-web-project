import { Outlet } from "react-router-dom";

const LoginLayout = () => {
    return (
        <div>
            <Outlet /> {/* 중첩된 라우트를 렌더링 */}
        </div>
    );
};

export default LoginLayout;
