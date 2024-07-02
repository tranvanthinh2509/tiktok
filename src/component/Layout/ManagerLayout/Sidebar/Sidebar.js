import { NavLink } from 'react-router-dom';
import { Home, Following, Friendl, LetGo, LiveAction } from '../../../Icons';
import { useSelector } from 'react-redux';
import Image from '../../../Image/Image';
import AccountFollow from '../../../AccountFollow/AccountFollow';

function Sidebar() {
    const user = useSelector((state) => state.user);
    const action = [
        {
            icon: <Following />,
            title: 'Manager Users',
            to: '/manager/user',
        },
        {
            icon: <Home />,
            title: 'Manager Video',
            to: '/manager/video',
        },
    ];

    return (
        <div className="w-60 h-full py-5 pl-2">
            <div className="fixed mt-16 w-60">
                <div className="action pb-2 ">
                    {action.map((item) => {
                        return (
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'flex items-center px-2 py-2 cursor-pointer hover:bg-gray-100 text-red-500 hover:text-red-500'
                                        : 'flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer hover:text-black'
                                }
                            >
                                {item.avatar ? (
                                    <Image
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
            </div>
        </div>
    );
}

export default Sidebar;
