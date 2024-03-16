import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth } from "../Firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

interface IForm {
    email: string;
    password: string;
    passwordConfirm: string;
}

export default function Join() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<IForm>();

    const navigate = useNavigate();
    const password = watch("password");

    const onCreateUser = async (data: IForm) => {
        try {
            const userCreate = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            console.log(userCreate.user);
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-login-bg flex justify-center">
            <form
                onSubmit={handleSubmit(onCreateUser)}
                className=" w-4/5 py-12  max-w-7xl  mx-auto my-10  bg-slate-800 text-gray-700 flex flex-col justify-end items-center"
            >
                <Link to={"/"} className="text-amber-200 text-5xl mb-5">
                    GameWorld
                </Link>
                <div className="text-5xl text-white ">회원가입</div>

                <div>
                    <div className="py-10  text-3xl">
                        <div>
                            <input
                                {...register("email", {
                                    required: "이메일을 작성해주세요",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message:
                                            "이메일 형식에 맞춰 작성해주세요",
                                    },
                                })}
                                type="emali"
                                placeholder="이메일"
                                className="rounded-2xl border-2 border-blue-500"
                            />
                        </div>
                        {errors.email && (
                            <div className="text-red-500 text-xl my-2">
                                {errors.email.message}
                            </div>
                        )}
                    </div>

                    <div className="py-10  text-3xl">
                        <div>
                            <input
                                {...register("password", {
                                    required: "비밀번호를 작성해주세요",
                                    minLength: {
                                        value: 8,
                                        message: "8글자 이상 작성해주세요",
                                    },
                                })}
                                type="password"
                                placeholder="비밀번호"
                                className="rounded-2xl border-2 border-blue-500"
                            />
                        </div>
                        {errors.password && (
                            <div className="text-red-500 text-xl my-2">
                                {errors.password.message}
                            </div>
                        )}
                    </div>

                    <div className="py-10  text-3xl">
                        <div>
                            <input
                                {...register("passwordConfirm", {
                                    required: "비밀번호를 작성해주세요",
                                    validate: (value) =>
                                        value === password ||
                                        "비밀번호가 일치하지 않습니다",
                                })}
                                type="password"
                                placeholder="비밀번호 확인"
                                className="rounded-2xl border-2 border-blue-500"
                            />
                        </div>
                        {errors.passwordConfirm && (
                            <div className="text-red-500 text-xl my-2">
                                {errors.passwordConfirm.message}
                            </div>
                        )}
                    </div>
                </div>

                <div className="py-40 text-3xl space-x-20">
                    <input
                        className="border-2 hover:cursor-pointer border-lime-400 hover:bg-lime-700 text-white rounded-2xl p-3"
                        type="submit"
                        value="가입하기"
                    />
                </div>
            </form>
        </div>
    );
}
