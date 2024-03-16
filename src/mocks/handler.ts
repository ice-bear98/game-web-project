import { HttpResponse, http } from "msw";
import * as dummy from "./dummy.json";
const BASE_URL = "https://api.rawg.io/api/games";

export const handlers = [
    http.get(
        `${BASE_URL}?key=${import.meta.env.VITE_REACT_APP_RAWG_API_KEY}`,
        () => {
            return HttpResponse.json(dummy);
        }
    ),
];
