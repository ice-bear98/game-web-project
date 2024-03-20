export default function Footer() {
    return (
        <div className="bg-slate-950 text-white">
            <div className="flex justify-center items-center flex-col ">
                <div className=" py-4 mb-5">
                    이 웹은 개인 공부를 위해 제작되었으며 게임을 취미로 하시는
                    분들에게 작은 도움이 되면 좋겠다는 생각으로 만들어 봤습니다.
                </div>
                <div className="flex space-x-8 pb-4">
                    <div>Github</div>
                    <div>Velog</div>
                </div>
            </div>
        </div>
    );
}
