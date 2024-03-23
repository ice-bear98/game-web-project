import axios from "axios";

const API_KEY = import.meta.env.VITE_REACT_APP_NEWS_API_KEY;
const BASE_URL = "https://gnews.io/api/v4/search";

export async function getGameNewsList() {
    try {
        const response = await axios.get(`${BASE_URL}`, {
            params: {
                q: "playstation",
                apikey: API_KEY,
            },
        });
        console.log(response);
        return response.data.articles || [];
    } catch (error) {
        console.error("GNews API 호출 중 오류 발생:", error);
        return [];
    }
}
