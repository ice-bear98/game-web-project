import { useRecoilValue } from "recoil";
import { fetchGameNews } from "../atom/GameNews";

export default function GameNews() {
    const newsList = useRecoilValue(fetchGameNews);

    const handleNewsClick = (url: any) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="max-w-4xl mx-auto py-8 bg-slate-700">
            <h1 className="text-3xl font-bold text-center mb-8 text-white">
                Game News
            </h1>
            {newsList.length > 0 ? (
                newsList.map((article: any, index: any) => (
                    <div
                        key={index}
                        className="flex items-start mb-6 border-b border-gray-200 pb-4 cursor-pointer"
                        onClick={() => handleNewsClick(article.url)}
                    >
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-48 h-32 object-cover flex-none mr-4"
                        />
                        <div className="flex-grow">
                            <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <h2 className="font-semibold text-lg text-white">
                                    {article.title}
                                </h2>
                            </a>
                            <p className="text-gray-200 mt-1">
                                {article.description}
                            </p>
                            <p className="text-gray-400 text-sm mt-2">
                                Published at:{" "}
                                {new Date(
                                    article.publishedAt
                                ).toLocaleDateString()}
                            </p>
                            <p className="text-gray-400 text-sm">
                                Source:{" "}
                                <a
                                    href={article.source.url}
                                    className="text-blue-300 hover:text-blue-500"
                                >
                                    {article.source.name}
                                </a>
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-200">
                    No news articles found.
                </p>
            )}
        </div>
    );
}
