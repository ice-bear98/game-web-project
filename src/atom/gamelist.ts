import { atom, selector } from "recoil";
import { getGameList } from "../api/GameListApi";

export type GameInfo = {
    id: number;
    name: string;
    slug: string;
    released: string;
    background_image: string;
    rating: number;
    rating_top: number;
    metacritic: number;
    playtime: number;
    esrb_rating?: { id: number; name: string; slug: string };
    updated: string;
    genres: {
        id: number;
        name: string;
        slug: string;
        games_count: number;
        image_background: string;
    }[];
    stores: {
        id: number;
        store: {
            id: number;
            name: string;
            slug: string;
            domain: string;
            games_count: number;
            image_background: string;
        };
    }[];
    tags: {
        id: number;
        name: string;
        slug: string;
        language: string;
        games_count: number;
        image_background: string;
    }[];
    short_screenshots: { id: number; image: string }[];
};

export const gameListState = atom({
    key: "gameListState",
    default: [],
});

export const fetchGameList = selector<GameInfo[]>({
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
