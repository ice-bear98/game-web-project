import { atom, selector } from "recoil";
import { getGameNewsList } from "../api/GameNewsApi";

export const gameNewsState = atom({
    key: "gameNewsState",
    default: [],
});

export const fetchGameNews = selector({
    key: "fetchGameNews",
    get: async () => {
        const newsList = await getGameNewsList();
        return newsList;
    },
});
