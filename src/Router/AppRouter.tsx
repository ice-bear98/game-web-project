import DefaultLayout from "../layout/DefaultLayout";
import LoginLayout from "../layout/LoginLayout";
import Community from "../pages/Community";
import CommunityDetail from "../pages/CommunityDetail";
import CommunityWrite from "../pages/CommunityWrite";
import GameDetail from "../pages/GameDetail";
import GameNews from "../pages/GameNews";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Join from "../pages/Join";
import Error from "../pages/Error";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mypage from "../pages/Mypage";
import { Suspense } from "react";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<DefaultLayout />}>
                    <Route
                        path="/"
                        element={
                            <Suspense
                                fallback={
                                    <div className="text-center text-5xl">
                                        loading...
                                    </div>
                                }
                            >
                                <Home />
                            </Suspense>
                        }
                    />
                    <Route path="/GameDetail/:id" element={<GameDetail />} />
                    <Route
                        path="/GameNews"
                        element={
                            <Suspense
                                fallback={
                                    <div className="text-center text-5xl">
                                        loading...
                                    </div>
                                }
                            >
                                <GameNews />
                            </Suspense>
                        }
                    />
                    <Route path="/mypage" element={<Mypage />} />
                    <Route path="/Community" element={<Community />} />
                    <Route
                        path="/community/:id"
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
