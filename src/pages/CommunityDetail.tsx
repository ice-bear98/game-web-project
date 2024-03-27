import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue, runTransaction } from "firebase/database";
import { realtimeDb } from "../Firebase/FirebaseConfig";
import Comments from "../component/Comments";

interface Post {
    id?: string;
    title: string;
    views: number;
    content: string;
    author: string;
    created: string;
}

export default function CommunityDetail() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        if (!id) return;

        const postRef = ref(realtimeDb, `community/posts/${id}`);

        onValue(postRef, (snapshot) => {
            const data = snapshot.val();
            setPost({ id, ...data });
        });

        runTransaction(postRef, (post) => {
            if (post) {
                post.views = (post.views || 0) + 1;
            }
            return post;
        });
    }, [id]);

    if (!post) {
        return <div className="text-center py-10">로딩 중...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto py-8 p-4">
            <h2 className="text-3xl font-bold text-center ">{post.title}</h2>
            <div className="mb-4 text-center text-gray-500">
                작성자: {post.author} | 작성일:{" "}
                {new Date(post.created).toLocaleDateString()} | 조회수:{" "}
                {post.views}
            </div>
            <article className="whitespace-pre-wrap prose lg:prose-xl p-4 mb-9 mx-auto min-h-80 rounded-lg bg-gray-200">
                {post.content}
            </article>
            <Comments postId={id ?? ""} />
        </div>
    );
}
