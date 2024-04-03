import { NavLink } from 'react-router-dom';
import { Home, Following, Friendl, LetGo, LiveAction } from '../../../Icons';
import { useSelector } from 'react-redux';

function Sidebar() {
    const user = useSelector((state) => state.user);
    const action = [
        {
            icon: <Home />,
            title: 'Dành cho bạn',
            to: '/',
        },
        {
            icon: <Following />,
            title: 'Dang follow',
            to: '/following',
        },
        {
            icon: <Friendl />,
            title: 'Bạn bè',
            to: '/friends',
        },
        {
            icon: <LetGo />,
            title: 'Khám phá',
            to: '/explorer',
        },
        {
            icon: <LiveAction />,
            title: 'Live',
            to: '/following1',
        },
        {
            avatar: 'https://i1.sndcdn.com/artworks-i0nLuYBs0dR2nsn4-AkxVlg-t500x500.jpg',
            title: 'Hồ sơ',
            to: '/profile',
        },
    ];

    return (
        <div className="w-60 h-full py-5 pl-2">
            <div className="fixed mt-16 w-60">
                <div className="action pb-2 border-b border-gray-300">
                    {action.map((item) => {
                        return (
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'flex items-center px-2 py-2 cursor-pointer hover:bg-gray-100 text-red-500'
                                        : 'flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer'
                                }
                            >
                                {item.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt="son-tung"
                                        className="w-8 h-8 p-1 rounded-[-50%] object-cover"
                                    />
                                ) : (
                                    <span>{item.icon}</span>
                                )}

                                <span className="text-[-18] ml-2 font-bold ">{item.title}</span>
                            </NavLink>
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
        </div>
    );
}

export default Sidebar;
