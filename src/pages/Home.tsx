import { useRecoilValue } from "recoil";
import { fetchGameList } from "../atom/GameList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const gameList = useRecoilValue(fetchGameList);
    const [selectedGenre, setSelectedGenre] = useState("All");
    const navigate = useNavigate();

    const genres = [
        "All",
        "Action",
        "RPG",
        "Shooter",
        "Puzzle",
        "Indie",
        "Platformer",
        "Adventure",
    ];

    const filteredGames =
        selectedGenre === "All"
            ? gameList
            : gameList.filter((game: any) =>
                  game.genres.some((genre: any) => genre.name === selectedGenre)
              );

    const handleGameListDetail = (id: number) => {
        navigate(`/GameDetail/${id}`);
    };

    return (
        <div className="bg-slate-700">
            <div className="max-w-7xl mx-auto my-0">
                <div className="flex flex-wrap gap-2 justify-center py-4">
                    {genres.map((genre) => (
                        <button
                            key={genre}
                            onClick={() => setSelectedGenre(genre)}
                            className={`px-4 py-2 rounded-lg 
                            ${
                                selectedGenre === genre
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-black"
                            } transition-colors`}
                        >
                            {genre}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-3 gap-3 ">
                    {filteredGames.length > 0 ? (
                        filteredGames.map((game: any) => (
                            <div
                                key={game.id}
                                onClick={() => handleGameListDetail(game.id)}
                                className="text-center hover:cursor-pointer text-slate-300 "
                            >
                                <h2>{game.name}</h2>
                                <img
                                    className="h-5/6 mx-auto transition duration-200 transform hover:scale-105"
                                    src={game.background_image}
                                    alt={game.name}
                                    style={{ width: "100%", maxWidth: "400px" }}
                                />
                            </div>
                        ))
                    ) : (
                        <p>게임 목록을 불러오는 중...</p>
                    )}
                </div>
            </div>
        </div>
    );
}
