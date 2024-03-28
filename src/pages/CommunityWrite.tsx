import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, push, set } from "firebase/database";
import { realtimeDb } from "../Firebase/FirebaseConfig";
import { userState } from "../atom/UserLoginState";
import { useRecoilValue } from "recoil";

export default function CommunityWrite() {
    const user = useRecoilValue(userState);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            alert("로그인이 필요한 기능입니다.");
            navigate("/login");
        }
    }, [user, navigate]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const postsRef = ref(realtimeDb, "community/posts");
        const newPostRef = push(postsRef);
        set(newPostRef, {
            title,
            content,
            views: 0,
            author: user?.uid,
            created: new Date().toISOString(),
        });

        navigate("/community");
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목"
                    required
                    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="내용"
                    required
                    className="whitespace-pre-wrap h-64 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
                >
                    제출
                </button>
            </form>
        </div>
    );
}
