import { SiVelog } from "react-icons/si";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
    const navigateToGithub = () => {
        window.location.href = "https://github.com/ice-bear98/game-web-project";
    };

    const navigateToVelog = () => {
        window.location.href = "https://velog.io/@tmdcksqkd123/posts";
    };

    return (
        <div className="bg-slate-950 text-white">
            <div className="flex justify-center items-center flex-col ">
                <div className=" py-4 mb-5">
                    이 웹은 개인 공부를 위해 제작되었으며 게임을 취미로 하시는
                    분들에게 작은 도움이 되면 좋겠다는 생각으로 만들어 봤습니다.
                </div>
                <div className="flex space-x-8 pb-4">
                    <div
                        className="text-center hover:cursor-pointer"
                        onClick={navigateToGithub}
                    >
                        <FaGithub size="48px" color="white" />
                        <span>Github</span>
                    </div>
                    <div
                        className="text-center hover:cursor-pointer"
                        onClick={navigateToVelog}
                    >
                        <SiVelog size="48px" color="green" />
                        <span>Velog</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
