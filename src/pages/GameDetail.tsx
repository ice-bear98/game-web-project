import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import { GameInfo, fetchGameList } from "../atom/GameList";
import CommentsSection from "../component/Comments";
export default function GameDetail() {
    const { id } = useParams();
    const gameList = useRecoilValue(fetchGameList);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const game = gameList.find((game: GameInfo) => `${game.id}` === id);

    const openModal = (image: string) => {
        setSelectedImage(image);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [showModal]);

    if (!game) {
        return <p>해당 게임을 찾을 수 없습니다.</p>;
    }

    return (
        <div className="max-w-7xl mx-auto my-0 p-4 space-y-8">
            <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-8">
                <img
                    src={game.background_image}
                    alt={game.name}
                    className="md:w-1/2 w-full h-auto rounded-lg shadow-lg"
                />
                <div className="md:w-1/2">
                    <h2 className="text-2xl font-bold mb-2">{game.name}</h2>
                    <p className="mb-1">출시일: {game.released}</p>
                    <p className="mb-1">
                        장르:{" "}
                        {game.genres.map((genre: any) => genre.name).join(", ")}
                    </p>
                    <p className="mb-1">플레이 시간: {game.playtime}시간</p>
                    <p className="mb-1">Metacritic 점수: {game.metacritic}</p>
                    <p className="mb-1">
                        평점: {game.rating} / {game.rating_top}
                    </p>
                    <p className="mb-1">
                        ESRB 평가:{" "}
                        {game.esrb_rating ? game.esrb_rating.name : "Not Rated"}
                    </p>
                    <p className="mb-1">고유 식별자: {game.slug}</p>
                    <p className="mb-1">업데이트 날짜: {game.updated}</p>
                    <p className="mb-1">
                        스토어:{" "}
                        {game.stores
                            .map((store: any) => store.store.name)
                            .join(", ")}
                    </p>
                    <p className="mb-4">
                        태그: {game.tags.map((tag: any) => tag.name).join(", ")}
                    </p>
                </div>
            </div>
            <div>
                <h3 className="text-xl font-semibold mb-2">스크린샷:</h3>
                <div className="flex overflow-x-auto space-x-4">
                    {game.short_screenshots.map((screenshot: any) => (
                        <img
                            key={screenshot.id}
                            src={screenshot.image}
                            alt="스크린샷"
                            className="min-w-[100px] h-[100px] rounded-md shadow-md "
                            onClick={() => openModal(screenshot.image)}
                        />
                    ))}
                </div>
            </div>
            {showModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white p-4 max-w-3xl max-h-full overflow-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage}
                            alt="Selected"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            )}
            <CommentsSection gameId={String(game.id)} />
        </div>
    );
}
