import { useRecoilValue } from "recoil";
import { fetchGameList } from "../atom/GameList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import "../index.css";

export default function Home() {
    const gameList = useRecoilValue(fetchGameList);
    const [selectedGenre, setSelectedGenre] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const totalGamesCount = gameList.length;
    const navigate = useNavigate();

    console.log(gameList);
    const handlePageChange = (pageNumber: number) => {
        console.log(`active page is ${pageNumber}`);
        setCurrentPage(pageNumber);
        // 페이지 변경 시 필요한 로직 추가 (예: 새로운 데이터 로딩)
    };

    const filteredGames =
        selectedGenre === "All"
            ? gameList
            : gameList.filter((game: any) =>
                  game.genres.some((genre: any) => genre.name === selectedGenre)
              );

    // 한 페이지에 표시할 아이템의 최대 개수
    const itemCount = 15;

    // 현재 페이지에서 표시할 게임 목록의 시작 인덱스
    const indexOfLastItem = currentPage * itemCount;
    const indexOfFirstItem = indexOfLastItem - itemCount;

    // 현재 페이지에서 표시할 게임 목록
    const currentGames = filteredGames.slice(indexOfFirstItem, indexOfLastItem);

    const genres = [
        "All",
        ...new Set(
            gameList
                .map((game) => game.genres.map((genre) => genre.name))
                .flat()
        ),
    ];

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
                    {currentGames.length > 0 ? (
                        currentGames.map((game: any) => (
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
                <div className="pagination-container">
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={15}
                        totalItemsCount={totalGamesCount}
                        pageRangeDisplayed={5}
                        prevPageText={"‹"}
                        nextPageText={"›"}
                        onChange={handlePageChange}
                        itemClass="page-item" // 페이지 아이템에 적용될 클래스
                        linkClass="page-link" // 페이지 링크에 적용될 클래스
                    />
                </div>
            </div>
        </div>
    );
}
