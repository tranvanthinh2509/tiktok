import images from '../../asset/image/index';
import Image from '../../component/Image/Image';

import 'tippy.js/dist/tippy.css';
import Menu from '../../component/Popper/Menu/Menu';
import { Profile, Logout, Following } from '../../component/Icons';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AiFillPicture } from 'react-icons/ai';
import Button from '../../component/Layout/component/Button/Button';
import { useEffect, useState } from 'react';
import { getBase64 } from '../../utils';
import * as VideoService from '../../services/VideoService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as Message from '../../component/Message/Message';
import TableComponent from '../../component/Table/TableComponent';
import { useQuery } from '@tanstack/react-query';

function SystemAdminUpload() {
    const user = useSelector((state) => state.user);

    // const [description, setDesciption] = useState('');
    // const [tag, setTag] = useState('');
    // const stateVideo = {
    //     description,
    //     tag,
    // };
    // const mutation = useMutationHooks((data) => {
    //     const { description, tag, imageBg, video } = data;
    //     const res = VideoService.createVideo({
    //         description,
    //         tag,
    //     });
    //     return res;
    // });

    const getAllVideo = async () => {
        const res = await VideoService.getAllVideo();
        return res;
    };
    // const { data, isPending, isSuccess, isError } = mutation;
    const { isLoading: isLoadingVideo, data: videos } = useQuery({ queryKey: ['videos'], queryFn: getAllVideo });
    console.log('data ', videos);
    const User_MENU = [
        {
            icon: <Profile />,
            title: 'Xem hồ sơ',
        },
        {
            icon: <Logout />,
            title: 'Đăng xuất',
        },
    ];

    const action = [
        {
            icon: <Following />,
            title: 'Trang chủ',
            to: '/1',
        },
        {
            icon: <Following />,
            title: 'Bài đăng',
            to: '/system/admin',
        },
        {
            icon: <Following />,
            title: 'Phân tích',
            to: '/3',
        },
        {
            icon: <Following />,
            title: 'Phản hồi',
            to: '/4',
        },
    ];

    return (
        <div>
            <div className="header fixed w-full z-20 pl-5 pr-16 h-16 border-b border-b-gray flex items-center justify-between bg-white">
                <div className="flex items-center ">
                    <img className="logo" src={images.logo.default} alt="tik-tok" />
                    <div className="ml-5">
                        <div className="px-3 bg-black text-white text-[-14] font-semibold rounded-sm text-center ">
                            Creator Center
                        </div>
                    </div>
                    <div className="ml-2">
                        <div className=" px-3 bg-[-primary] text-white text-[-14] font-semibold rounded-sm text-center ">
                            Beta
                        </div>
                    </div>
                </div>

                <div className="actor flex items-center">
                    <Menu items={User_MENU}>
                        <Image src={user.avatar} alt="son-tung" className="w-8 h-8 rounded-[-50%] object-cover ml-6 " />
                    </Menu>
                </div>
            </div>

            {/* Sidebar */}
            <div className="flex">
                <div className="w-60 h-full py-5 pl-2 pr-3 border-r border-b-gray-300">
                    <div className=" mt-16 w-full h-screen  ">
                        <div className="pb-6 border-b border-b-gray-300">
                            <Button
                                primary
                                bigbig
                                // className="w-full py-3  bg-[-primary] text-white text-[-18] font-semibold "
                                to="/system/admin/upload"
                            >
                                Tải lên
                            </Button>
                        </div>
                        <div>
                            <div className="action pt-2">
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
                                            <span>{item.icon}</span>

                                            <span className="text-[-18] ml-2 font-medium">{item.title}</span>
                                        </NavLink>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex-1 h-screen bg-[-white-fake]">
                    <div>
                        <div className="w-3/4 h-5/6 mx-auto mt-10 bg-white border border-gray-200 rounded-md px-10 py-6">
                            <h1 className="text-2xl font-bold">Quản lí video</h1>
                            <div className="mt-5">
                                <TableComponent videos={videos?.data} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SystemAdminUpload;
