import { useNavigate } from "react-router-dom";

export default function Error() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center max-w-5xl mx-auto my-0 space-y-5">
            <div className="text-red-700 text-8xl bold">404 Error</div>
            <p className="text-3xl">
                죄송합니다 현재 페이지는 찾을 수 없는 페이지입니다.
            </p>
            <button
                onClick={() => {
                    navigate("/");
                }}
                className=" rounded-lg bg-blue-500 text-white px-4 py-2  hover:bg-blue-700 transition duration-300"
            >
                Home으로 이동하기
            </button>
        </div>
    );
}
