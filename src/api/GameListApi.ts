import axios from "axios";

const API_KEY = import.meta.env.VITE_REACT_APP_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api/games";

export async function getGameList() {
    const response = await axios.get(`${BASE_URL}?key=${API_KEY}`);
    return response.data.results || [];
}
