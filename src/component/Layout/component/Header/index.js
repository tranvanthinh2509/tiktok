import images from '../../../../asset/image';

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
function Header() {
    const curentUser = true;
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
            separate: true,
        },
    ];

    return (
        <div className="header pl-4 pr-5 h-[-60] border-b border-b-gray flex items-center justify-between ">
            <img className="logo" src={images.logo.default} alt="tik-tok" />

            {/* Search */}
            <Search />

            <div className="actor flex items-center">
                <Button
                    to="https://www.tiktok.com/foryou?lang=vi-VN"
                    target="_blank"
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
                    <>
                        <Button to="https://www.tiktok.com/foryou?lang=vi-VN" target="_blank" primary>
                            <p className="text-[-18] font-semibold">Đăng nhập</p>
                        </Button>
                    </>
                )}

                <Menu items={curentUser ? User_MENU : MENU_ITEMS}>
                    {curentUser ? (
                        <img
                            src="https://i1.sndcdn.com/artworks-i0nLuYBs0dR2nsn4-AkxVlg-t500x500.jpg"
                            alt="son-tung"
                            className="w-8 rounded-[-50%] object-cover ml-6 py-2.5"
                        />
                    ) : (
                        <button className="px-1 py-3.5 ml-1">
                            <PiDotsThreeOutlineVerticalFill className="w-5 h-5" fontSize="18px" color="#161823" />
                        </button>
                    )}
                </Menu>
            </div>
        </div>
    );
}

export default Header;
