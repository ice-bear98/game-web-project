import { useRecoilValue } from "recoil";
import { fetchGameList } from "../atom/GameList";

export default function Home() {
    const gameList = useRecoilValue(fetchGameList);
    console.log(gameList);
    return <div>123</div>;
}
