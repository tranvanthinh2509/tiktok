import images from '../../../../asset/image';
import Image from '../../../Image/Image';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Button from '../Button/Button';
import Search from './Search/Search';
import { FaPlus } from 'react-icons/fa6';
import Menu from '../../../Popper/Menu/Menu';
import {
    IdeaIcon,
    VietNamese,
    Question,
    KeyBoard,
    Message,
    MailBox,
    Profile,
    Love,
    GiveCoin,
    Live,
    Setting,
    Logout,
} from '../../../Icons';
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi';
import Login from '../../../Login/Login';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoFastFood } from 'react-icons/io5';
import * as UserService from '../../../../services/UserService';
import { resetUser } from '../../../../redux/slides/userSlide';
import { MenuItem } from '@material-tailwind/react';

function Header() {
    const user = useSelector((state) => state.user);

    let curentUser = false;
    if (user?.email) {
        curentUser = user;
    }

    const dispatch = useDispatch();
    const handleLogout = async () => {
        await UserService.logoutUser();
        dispatch(resetUser());
        localStorage.removeItem('access_token');
    };
    const MENU_ITEMS = [
        {
            icon: <IdeaIcon />,
            title: 'Trung tâm sáng táo nội dung',
        },
        {
            icon: <VietNamese />,
            title: 'Tiếng việt',
            children: {
                title: 'Language',
                data: [
                    {
                        type: 'languege',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'languege',
                        code: 'vn',
                        title: 'Tiếng Việt',
                    },
                ],
            },
        },
        {
            icon: <Question />,
            title: 'Phản hồi và trợ giúp',
        },
        {
            icon: <KeyBoard />,
            title: 'Phím tắt trên bàn phím',
        },
    ];

    const User_MENU = [
        {
            icon: <Profile />,
            title: 'Xem hồ sơ',
        },
        {
            icon: <Love />,
            title: 'Yêu thích',
        },
        {
            icon: <GiveCoin />,
            title: 'Nhận xu',
        },
        {
            icon: <Live />,
            title: 'Live Studio',
        },

        {
            icon: <IdeaIcon />,
            title: 'Trung tâm sáng táo nội dung',
        },
        {
            icon: <Setting />,
            title: 'Cài đặt',
        },
        {
            icon: <VietNamese />,
            title: 'Tiếng việt',
            children: {
                title: 'Language',
                data: [
                    {
                        type: 'languege',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'languege',
                        code: 'vn',
                        title: 'Tiếng Việt',
                    },
                ],
            },
        },
        {
            icon: <Question />,
            title: 'Phản hồi và trợ giúp',
        },
        {
            icon: <KeyBoard />,
            title: 'Phím tắt trên bàn phím',
        },
        {
            icon: <Logout />,
            title: 'Đăng xuất',
            separate: handleLogout,
        },
    ];

    const [menuHeader, setMenuHeader] = useState('');
    useEffect(() => {
        setMenuHeader(user?.email);
    }, [user?.email]);

    const [login, setLogin] = useState(false);
    const handleLogin = () => {
        setLogin(true);
    };

    return (
        <div>
            {login && (
                <Login
                    onClick={() => {
                        setLogin(false);
                    }}
                />
            )}
            <div className="header fixed w-full z-20 pl-4 pr-5 h-16 border-b border-b-gray flex items-center justify-between bg-white">
                <div className="w-72 m-2">
                    <img className="logo" src={images.logo.default} alt="tik-tok" />
                </div>

                {/* Search */}
                <Search />

                <div className="actor flex items-center">
                    <Button
                        to="/system/admin/upload"
                        text
                        leftIcon={<FaPlus className="mr-2 w-5 h-5" fontSize="14px" color="#161823" />}
                    >
                        <p className="text-[-18]  font-semibold ">Tải lên</p>
                    </Button>

                    {curentUser ? (
                        <>
                            <Tippy delay={[0, 200]} content="Tin nhắn" placement="bottom">
                                <div>
                                    <Button icon>
                                        <Message />
                                    </Button>
                                </div>
                            </Tippy>

                            <Tippy delay={[0, 200]} content="Hộp thư" placement="bottom">
                                <div>
                                    <Button icon>
                                        <MailBox className="relative" />
                                        <span className="absolute top-2 right-3.7 bg-red-500 text-[-14] font-semibold text-white w-5 rounded-[-50%]">
                                            7
                                        </span>
                                    </Button>
                                </div>
                            </Tippy>
                        </>
                    ) : (
                        <div onClick={handleLogin}>
                            <Button primary>
                                <p className="text-[-18] font-semibold">Đăng nhập</p>
                            </Button>
                        </div>
                    )}
                    {menuHeader && (
                        <Menu items={User_MENU}>
                            {curentUser ? (
                                <Image
                                    src={user.avatar}
                                    alt="son-tung"
                                    className="w-8 h-8 rounded-[-50%] object-cover ml-6 "
                                />
                            ) : (
                                <button className="px-1 py-3.5 ml-1">
                                    <PiDotsThreeOutlineVerticalFill
                                        className="w-5 h-5"
                                        fontSize="18px"
                                        color="#161823"
                                    />
                                </button>
                            )}
                        </Menu>
                    )}
                    {!menuHeader && (
                        <Menu items={MENU_ITEMS}>
                            {curentUser ? (
                                <Image
                                    src={user.avatar}
                                    alt="son-tung"
                                    className="w-8 h-8 rounded-[-50%] object-cover ml-6 "
                                />
                            ) : (
                                <button className="px-1 py-3.5 ml-1">
                                    <PiDotsThreeOutlineVerticalFill
                                        className="w-5 h-5"
                                        fontSize="18px"
                                        color="#161823"
                                    />
                                </button>
                            )}
                        </Menu>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
