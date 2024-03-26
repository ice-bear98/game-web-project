import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { LoggedInState } from "../atom/Login";
import { logout } from "../Firebase/FirebaseFuctions";
import { GameInfo, fetchGameList } from "../atom/GameList";
import { useState } from "react";

export default function header() {
    const isLoggedIn = useRecoilValue(LoggedInState);
    const setIsLoggedIn = useSetRecoilState(LoggedInState);
    const gameList = useRecoilValue(fetchGameList);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState<GameInfo[]>([]);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        setIsLoggedIn(false);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (query.trim() === "") {
            setFilteredResults([]);
        } else {
            const filtered = gameList.filter((game) =>
                game.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredResults(filtered);
        }
    };

    const handleResultClick = (gameId: number) => {
        navigate(`/GameDetail/${gameId}`);
        setSearchQuery("");
        setFilteredResults([]);
    };

    return (
        <div className="w-full h-24 bg-slate-950 text-white">
            <div className="flex py-12 items-center justify-between max-w-7xl mx-auto my-0">
                <div className="flex  space-x-4">
                    <div className="text-amber-200 text-3xl leading-5">
                        <Link className="" to={"/"}>
                            Gameworld
                        </Link>
                    </div>
                    <div className="text-xl leading-5">
                        <Link to={"/GameNews"}>게임뉴스</Link>
                    </div>
                    <div className="text-xl leading-5">
                        <Link to={"/Community"}>게시판</Link>
                    </div>
                </div>

                <div>
                    <form className="relative flex flex-col">
                        {isLoggedIn ? (
                            <div className="absolute bottom-7 right-0  flex justify-end space-x-2">
                                <Link to={"/mypage"}>내 정보</Link>
                                <button onClick={handleLogout}>로그아웃</button>
                            </div>
                        ) : (
                            <div className="absolute bottom-7 right-0  flex justify-end space-x-2">
                                <Link to={"/login"}>로그인</Link>
                                <Link to={"/join"}>회원가입</Link>
                            </div>
                        )}
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="게임 검색..."
                            className="text-black"
                        />
                        {filteredResults.length > 0 && (
                            <ul className="absolute top-6 overflow-y-auto border bg-slate-400 w-full  h-80 z-10 ">
                                {filteredResults.map((game) => (
                                    <li
                                        key={game.id}
                                        onClick={() =>
                                            handleResultClick(game.id)
                                        }
                                        className="p-2 hover:bg-gray-200 cursor-pointer"
                                    >
                                        {game.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
