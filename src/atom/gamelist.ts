import { atom, selector } from "recoil";
import { getGameList } from "../api/GameListApi";

export const gameListState = atom({
    key: "gameListState",
    default: [],
});

export const fetchGameList = selector({
    key: "fetchGameList",
    get: async () => {
        try {
            return await getGameList();
        } catch (error) {
            console.error("API 호출 중 오류 발생:", error);
            return [];
        }
    },
});
