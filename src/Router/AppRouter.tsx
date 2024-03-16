import DefaultLayout from "../layout/DefaultLayout";

import LoginLayout from "../layout/loginLayout";
import Community from "../pages/Community";
import CommunityDetail from "../pages/CommunityDetail";
import CommunityWrite from "../pages/CommunityWrite";
import GameDetail from "../pages/GameDetail";
import GameNewsDetail from "../pages/GameNewsDetail";
import GameNews from "../pages/GameNews";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Join from "../pages/Join";
import Error from "../pages/Error";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mypage from "../pages/Mypage";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/GameDetail/:id" element={<GameDetail />} />
                    <Route path="/GameNews" element={<GameNews />} />
                    <Route
                        path="/GameNewsDetail/:id"
                        element={<GameNewsDetail />}
                    />
                    <Route path="/mypage" element={<Mypage />} />
                    <Route path="/Community" element={<Community />} />
                    <Route
                        path="/CommunityDetail"
                        element={<CommunityDetail />}
                    />
                    <Route
                        path="/CommunityWrite"
                        element={<CommunityWrite />}
                    />
                    <Route path="/*" element={<Error />} />
                </Route>

                <Route element={<LoginLayout />}>
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Join" element={<Join />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
