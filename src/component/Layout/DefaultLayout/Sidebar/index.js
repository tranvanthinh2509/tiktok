import { Home, Following, Friendl, LetGo, LiveAction } from '../../../Icons';

function Sidebar() {
    const action = [
        {
            icon: <Home />,
            title: 'Dành cho bạn',
        },
        {
            icon: <Following />,
            title: 'Dang follow',
        },
        {
            icon: <Friendl />,
            title: 'Bạn bè',
        },
        {
            icon: <LetGo />,
            title: 'Khám phá',
        },
        {
            icon: <LiveAction />,
            title: 'Live',
        },
        {
            avatar: 'https://i1.sndcdn.com/artworks-i0nLuYBs0dR2nsn4-AkxVlg-t500x500.jpg',
            title: 'Hồ sơ',
        },
    ];

    return (
        <div className="w-60 py-5 pl-2">
            <div className="action pb-2 border-b border-gray-300">
                {action.map((item) => {
                    return (
                        <div className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer">
                            {item.avatar ? (
                                <img
                                    src={item.avatar}
                                    alt="son-tung"
                                    className="w-8 h-8 p-1 rounded-[-50%] object-cover"
                                />
                            ) : (
                                <span>{item.icon}</span>
                            )}

                            <p className="text-[-18] ml-2 font-bold text-[text-color]">{item.title}</p>
                        </div>
                    );
                })}
            </div>
            <div className="AccoutFollowing py-4 pl-2 border-b border-gray-300">
                <h1 className="text-[-16] font-semibold text-gray-500">Các tài khoảng đang follow</h1>
                <p className="text-[-14] mt-1 font-semibold text-gray-400">
                    Những tài khoản bạn đang following sẽ xuất hiện tại dây
                </p>
            </div>
            <div className="Footer pt-4 pl-2">
                <div className="relative">
                    <img
                        src="https://sf16-website-login.neutral.ttwstatic.com/obj/tiktok_web_login_static/tiktok/webapp/main/webapp-desktop/8152caf0c8e8bc67ae0d.png"
                        alt="lỗi"
                        className=""
                    ></img>
                    <p className="text-[-14] w-36 text-orange-200 font-semibold absolute top-1 right-4 bottom-0 ">
                        Tạo hiệu ứng TikTok, để nhận thưởng
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
