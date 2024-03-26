import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { realtimeDb } from "../Firebase/FirebaseConfig";

interface Post {
    id: string;
    title: string;
    views: number;
    author: string;
    created: string;
}

export default function Community() {
    const [posts, setPosts] = useState<Post[]>([]);
    const topFivePosts = useMemo(
        () => [...posts].sort((a, b) => b.views - a.views).slice(0, 5),
        [posts]
    );

    useEffect(() => {
        const postsRef = ref(realtimeDb, "community/posts");

        onValue(postsRef, (snapshot) => {
            const data = snapshot.val();
            const loadedPosts: Post[] = [];

            for (const id in data) {
                loadedPosts.push({ id, ...data[id] });
            }

            const sortedPosts = [...loadedPosts].sort(
                (a, b) =>
                    new Date(b.created).getTime() -
                    new Date(a.created).getTime()
            );

            setPosts(sortedPosts);
        });
    }, []);

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">조회수 Top 5</h2>
            <div className="mb-8">
                {topFivePosts.map((post) => (
                    <div key={post.id} className="mb-4 p-4 shadow rounded-lg">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">
                                <Link to={`/community/${post.id}`}>
                                    {post.title}
                                </Link>
                            </h3>
                            <p className="text-gray-500">
                                글쓴이: {post.author} / 등록일:{" "}
                                {new Date(post.created).toLocaleDateString()} /
                                조회수: {post.views}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="text-2xl font-bold mb-4">전체게시판</h2>
            <Link
                to="/CommunityWrite"
                className="mb-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
                글쓰기
            </Link>
            <div className="mt-4 pb-4">
                {posts.map((post) => (
                    <div key={post.id} className="mb-4 p-4 shadow rounded-lg">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold">
                                    <Link to={`/community/${post.id}`}>
                                        {post.title}
                                    </Link>
                                </h3>
                                <p className="text-gray-500">
                                    글쓴이: {post.author} / 등록일:{" "}
                                    {new Date(
                                        post.created
                                    ).toLocaleDateString()}{" "}
                                    / 조회수: {post.views}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
