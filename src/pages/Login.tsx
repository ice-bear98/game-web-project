//react
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

//firebase
import { auth } from "../Firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithGoogle } from "../Firebase/firebaseFuctions";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

interface IForm {
    email: string;
    password: string;
}

export default function Login() {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>();

    const onLogin = async (data: IForm) => {
        try {
            const userLogin = await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            console.log(userLogin);
            navigate("/");
        } catch (error: any) {
            switch (error.code) {
                case "auth/invalid-credential":
                    setLoginError(
                        "아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다."
                    );
                    break;
                case "auth/too-many-requests":
                    setLoginError(
                        "로그인 시도가 너무 많습니다. 나중에 다시 시도해주세요."
                    );
                    break;
                default:
                    setLoginError(
                        "로그인 중 오류가 발생했습니다. 나중에 다시 시도해주세요."
                    );
            }
        }
    };

    return (
        <div className="bg-login-bg flex justify-center">
            <div className=" w-4/5 py-12  max-w-7xl  mx-auto my-10  bg-slate-800 text-gray-700">
                <div className="text-5xl flex flex-col justify-end items-center ">
                    <Link to={"/"} className="text-amber-200 mb-5">
                        GameWorld
                    </Link>
                    <div className="text-white mb-4">로그인</div>
                </div>

                <form
                    className="flex flex-col justify-center items-center"
                    onSubmit={handleSubmit(onLogin)}
                >
                    <div className="py-4 text-3xl">
                        <input
                            {...register("email", {
                                required: "이메일을 입력해주세요.",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "이메일 형식에 맞춰 작성해주세요",
                                },
                            })}
                            type="emali"
                            placeholder="이메일"
                            className="rounded-2xl border-2 border-blue-500"
                        />
                        <div className="text-red-500 text-xl my-2">
                            {errors.email && errors.email.message}
                        </div>
                    </div>

                    <div className="py-4 text-3xl">
                        <input
                            {...register("password", {
                                required: "비밀번호를 입력해주세요.",
                            })}
                            type="password"
                            placeholder="비밀번호"
                            className="rounded-2xl border-2 border-blue-500"
                        />

                        <div className="text-red-500 text-xl my-2">
                            {errors.password && errors.password.message}
                        </div>
                    </div>
                    <div className="text-red-500">
                        {loginError && loginError}
                    </div>

                    <div className=" w-16  py-10 text-3xl flex space-x-4">
                        <button
                            className="border-slate-500 border-2 rounded-2xl  p-3 hover:bg-slate-300 "
                            onClick={signInWithGoogle}
                        >
                            <FontAwesomeIcon className="" icon={faGoogle} />
                        </button>
                    </div>

                    <div className="flex justify-between py-40 text-3xl space-x-20">
                        <input
                            type="submit"
                            value="확인"
                            className="hover:cursor-pointer border-2 border-lime-400 hover:bg-lime-700 text-white rounded-2xl p-3"
                        />
                        <button className="border-2 border-lime-400 hover:bg-lime-700 text-white rounded-2xl p-3">
                            <Link to={"/join"}>회원가입</Link>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
