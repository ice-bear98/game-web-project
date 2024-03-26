import { realtimeDb } from "./FirebaseConfig";
import { push, ref, set } from "firebase/database";
import uuid from "react-uuid";

export function writeUserData(
    gameId: string,
    comment: string,
    userUid: string
) {
    const id = uuid();
    const date = new Date();
    date.setHours(date.getHours() + 9);
    const formatedDate = date.toISOString().replace("T", " ").substring(0, 19);

    set(ref(realtimeDb, `game/${gameId}/${userUid}`), {
        id,
        comment,
        created: formatedDate,
        updated: formatedDate,
        gameId,
    });
}

export function writePostData(title: string, content: string, userUid: string) {
    const date = new Date();
    date.setHours(date.getHours() + 9);
    const formattedDate = date.toISOString().replace("T", " ").substring(0, 19);

    const newPostRef = push(ref(realtimeDb, `community/posts`));

    set(newPostRef, {
        title,
        content,
        userId: userUid,
        created: formattedDate,
        updated: formattedDate,
        views: 0,
    });
}
