import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth } from "../Firebase/firebaseConfig";
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
        <form
            onSubmit={handleSubmit(onCreateUser)}
            className=" py-12  max-w-7xl mx-auto my-0"
        >
            <div className="text-5xl ">
                이메일과 비밀번호를
                <br />
                입력해주세요
            </div>

            <div>
                <div className="py-10 text-3xl">
                    <div>이메일 주소</div>
                    <div>
                        <input
                            {...register("email", {
                                required: "이메일을 작성해주세요",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "이메일 형식에 맞춰 작성해주세요",
                                },
                            })}
                            type="emali"
                            placeholder="Email"
                        />
                    </div>
                    {errors.email && <div>{errors.email.message}</div>}
                </div>

                <div className="py-10 text-3xl">
                    <div>비밀번호</div>
                    <div>
                        <input
                            {...register("password", {
                                required: true,
                                minLength: {
                                    value: 8,
                                    message: "8글자 이상 작성해주세요",
                                },
                            })}
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                    {errors.password && <div>{errors.password.message}</div>}
                </div>

                <div className="py-10 text-3xl">
                    <div>비밀번호 확인</div>
                    <div>
                        <input
                            {...register("passwordConfirm", {
                                required: "비밀번호를 작성해주세요",
                                validate: (value) =>
                                    value === password ||
                                    "비밀번호가 일치하지 않습니다",
                            })}
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                    {errors.passwordConfirm && (
                        <div>{errors.passwordConfirm.message}</div>
                    )}
                </div>
            </div>

            <div className="py-40 text-3xl space-x-20">
                <input
                    className="bg-lime-400 hover:bg-lime-700 rounded-2xl p-3"
                    type="submit"
                    value="가입하기"
                />
            </div>
        </form>
    );
}
