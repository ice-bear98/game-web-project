import { useEffect, useState } from "react";
import {
    getAuth,
    reauthenticateWithCredential,
    EmailAuthProvider,
    updatePassword,
    deleteUser,
    signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { userState } from "../atom/UserLoginState";
import { useRecoilValue } from "recoil";

export default function Mypage() {
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [error, setError] = useState("");
    const user = useRecoilValue(userState);
    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            alert("로그인이 필요한 기능입니다.");
            navigate("/login");
        }
    }, [user, navigate]);

    const handleShowChangePassword = () => {
        setShowChangePassword(!showChangePassword);
        setError("");
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            setError("새 비밀번호가 일치하지 않습니다.");
            return;
        }

        const user = auth.currentUser;

        if (!user || !user.email) {
            setError("로그인 정보를 확인할 수 없습니다.");
            return;
        }

        try {
            const credential = EmailAuthProvider.credential(
                user.email,
                currentPassword
            );
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
            alert("비밀번호가 변경되었습니다. 다시 로그인해주세요.");
            await signOut(auth);
            navigate("/");
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("알 수 없는 에러가 발생했습니다.");
            }
        }
    };

    const handleDeleteAccount = async () => {
        const confirmation = window.confirm(
            "계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        );
        if (confirmation && auth.currentUser) {
            try {
                await deleteUser(auth.currentUser);
                alert("계정이 삭제되었습니다.");
                navigate("/");
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                } else {
                    console.log("알 수 없는 에러가 발생했습니다.");
                }
            }
        }
    };

    return (
        <div className="max-w-md mx-auto ">
            <h1 className="text-2xl font-bold mb-5">마이페이지</h1>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex flex-col gap-4">
                <button
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                    onClick={handleShowChangePassword}
                >
                    {showChangePassword ? "변경 취소" : "비밀번호 변경"}
                </button>
                {showChangePassword && (
                    <>
                        <input
                            className="border-2 border-gray-200 p-2 rounded-lg"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="현재 비밀번호"
                        />
                        <input
                            className="border-2 border-gray-200 p-2 rounded-lg"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="새 비밀번호"
                        />
                        <input
                            className="border-2 border-gray-200 p-2 rounded-lg"
                            type="password"
                            value={confirmNewPassword}
                            onChange={(e) =>
                                setConfirmNewPassword(e.target.value)
                            }
                            placeholder="새 비밀번호 확인"
                        />
                        <button
                            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                            onClick={handleChangePassword}
                        >
                            비밀번호 변경
                        </button>
                    </>
                )}
                <button
                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 mt-4"
                    onClick={handleDeleteAccount}
                >
                    회원 삭제
                </button>
            </div>
        </div>
    );
}
