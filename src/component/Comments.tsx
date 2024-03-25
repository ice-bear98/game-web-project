import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../atom/UserLoginState";
import { ref, onValue, push, set, off, remove } from "firebase/database";
import { realtimeDb } from "../Firebase/FirebaseConfig";

interface Comment {
    id: string;
    userId: string;
    text: string;
    timestamp: string;
}

const Comments = ({ gameId }: { gameId: string }) => {
    const user = useRecoilValue(userState);
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentText, setCommentText] = useState("");
    const [editingCommentId, setEditingCommentId] = useState<string | null>(
        null
    );
    const [editingText, setEditingText] = useState("");

    useEffect(() => {
        const commentsRef = ref(realtimeDb, `comments/${gameId}`);
        onValue(commentsRef, (snapshot) => {
            const data = snapshot.val();
            const loadedComments = data
                ? Object.entries(data).map(([key, value]) => ({
                      id: key,
                      ...(value as Comment),
                  }))
                : [];
            setComments(loadedComments);
            console.log(data);
        });

        return () => {
            off(commentsRef);
        };
    }, [gameId]);

    const handleCommentSubmit = () => {
        if (!user || !user.uid) {
            alert("로그인이 필요합니다.");
            return;
        }

        if (!commentText.trim()) {
            alert("댓글을 입력하세요.");
            return;
        }

        const commentsRef = ref(realtimeDb, `comments/${gameId}`);
        const newCommentRef = push(commentsRef);
        set(newCommentRef, {
            userId: user.uid,
            text: commentText,
            timestamp: new Date().toISOString(),
        });

        setCommentText("");
    };

    const handleEdit = (commentId: string) => {
        setEditingCommentId(commentId);
        const currentCommentText =
            comments.find((comment) => comment.id === commentId)?.text || "";
        setEditingText(currentCommentText);
    };

    const saveEdit = (commentId: string) => {
        const commentRef = ref(realtimeDb, `comments/${gameId}/${commentId}`);
        if (!user || !user.uid) {
            alert("로그인이 필요합니다.");
            return;
        }

        set(commentRef, {
            userId: user.uid,
            text: editingText,
            timestamp: comments.find((comment) => comment.id === commentId)
                ?.timestamp,
        });
        setEditingCommentId(null);
        setEditingText("");
    };

    const handleDelete = (commentId: string) => {
        const commentRef = ref(realtimeDb, `comments/${gameId}/${commentId}`);
        remove(commentRef);
    };

    return (
        <div className="space-y-4">
            {user ? (
                <div className="flex items-center space-y-2 bg-slate-300 p-4">
                    <textarea
                        className="flex-1  p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="댓글을 작성하세요..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button
                        className="ml-4 px-4 py-2 h-14 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg "
                        onClick={handleCommentSubmit}
                    >
                        댓글 작성
                    </button>
                </div>
            ) : (
                <div className="flex space-y-2 bg-slate-300">
                    <textarea
                        className="w-full h-15 m-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="댓글을 작성하세요..."
                        value={commentText}
                    />
                    <button
                        className=" m-4 p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg "
                        onClick={handleCommentSubmit}
                    >
                        댓글 작성
                    </button>
                </div>
            )}

            <div className="space-y-2">
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="bg-gray-100 p-4 rounded-lg shadow"
                    >
                        {editingCommentId === comment.id ? (
                            <div>
                                <textarea
                                    value={editingText}
                                    onChange={(e) =>
                                        setEditingText(e.target.value)
                                    }
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                                <button
                                    onClick={() => saveEdit(comment.id)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    저장
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        {comment.text}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(
                                            comment.timestamp
                                        ).toLocaleString()}
                                    </p>
                                </div>
                                {user?.uid === comment.userId && (
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() =>
                                                handleEdit(comment.id)
                                            }
                                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                                        >
                                            수정
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(comment.id)
                                            }
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;
