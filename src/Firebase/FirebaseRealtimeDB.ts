import { realtimeDb } from "./FirebaseConfig";
import { ref, set } from "firebase/database";
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

    const result = set(ref(realtimeDb, `game/${gameId}/${userUid}`), {
        id,
        comment,
        created: formatedDate,
        updated: formatedDate,
        gameId,
    });
    console.log(result);
}
