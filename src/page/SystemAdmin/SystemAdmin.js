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

function SystemAdmin() {
    const user = useSelector((state) => state.user);

    const [description, setDesciption] = useState('');
    const [tag, setTag] = useState('');
    const [imageBg, setImageBg] = useState('');
    const [video, setVideo] = useState('');
    const stateVideo = {
        description,
        tag,
        imageBg,
        video,
    };
    const mutation = useMutationHooks((data) => {
        const { description, tag, imageBg, video } = data;
        const res = VideoService.createVideo({
            description,
            tag,
            imageBg,
            video,
        });
        return res;
    });
    const { data, isPending, isSuccess, isError } = mutation;
    useEffect(() => {
        if (isSuccess && data.status === 'OK') {
            Message.success(data.message);
            window.location.reload();
        }
    });
    const handleDescription = (e) => {
        setDesciption(e.target.value);
    };
    const handleTag = (e) => {
        setTag(e.target.value);
    };
    const handleImageBg = async (fileList) => {
        const file = fileList[0];
        const base64 = await getBase64(file);
        setImageBg(base64.toString());
    };
    const handleVideo = async (fileList) => {
        const file = fileList[0];

        const base64 = await getBase64(file);
        setVideo(base64.toString());
    };
    const handleUpLoadVideo = () => {
        console.log('stateVideo ', stateVideo);
        mutation.mutate(stateVideo);
    };

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
            to: '/2',
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
                            <button className="w-full py-3  bg-gray-400 text-white text-[-18] font-semibold cursor-not-allowed ">
                                Tải lên
                            </button>
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
                            <div className="">
                                <h1 className="text-2xl font-bold">Tải video lên</h1>
                                <p className="text-xl font-medium text-gray-400 mt-2">
                                    Đăng video vào tài khoản của bạn
                                </p>
                            </div>

                            <div className="flex">
                                <div className="py-4  w-[-700]">
                                    <div>
                                        <div className="flex justify-between">
                                            <p className={'text-[-18] leading-6 w-40 font-semibold mr-4 '}>Chú thích</p>{' '}
                                            <p className="text-xs text-gray-950 mt-2">3/80</p>
                                        </div>

                                        <input
                                            type="text"
                                            value={description}
                                            onChange={(e) => handleDescription(e)}
                                            placeholder="Chú thích"
                                            className="w-full outline-none border border-gray-300 mt-2 px-3 py-2 bg-white rounded text-[-16] "
                                        />
                                    </div>
                                    <div className="mt-5">
                                        <div className="flex justify-between">
                                            <p className={'text-[-18] leading-6 w-40 font-semibold mr-4 '}>
                                                Từ khóa xu hướng
                                            </p>{' '}
                                            <p className="text-xs text-gray-950 mt-2">3/80</p>
                                        </div>

                                        <input
                                            type="text"
                                            value={tag}
                                            onChange={(e) => handleTag(e)}
                                            placeholder="Từ khóa xu hướng"
                                            className="w-full outline-none border border-gray-300 mt-2 px-3 py-2 bg-white rounded text-[-16] "
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <p className={'text-[-18] leading-6 w-32 font-semibold mr-4 '}>Ảnh bìa</p>
                                        <div className="relative ">
                                            <Image
                                                src={imageBg}
                                                alt="oke"
                                                className="w-40 h-52 rounded-md object-cover"
                                            />
                                            <div>
                                                <input
                                                    type="file"
                                                    name="avatarFile"
                                                    id="avatarFile"
                                                    fileList
                                                    className="opacity-0 h-0 w-0 cursor-pointer"
                                                    accept=".jpeg, .jpg, .png, .webg, .svg"
                                                    onChange={(e) => handleImageBg(e.target.files)}
                                                    // maxCount={1}
                                                />
                                                <label
                                                    for="avatarFile"
                                                    className="absolute top-0 left-0 bg-[-image-bg]"
                                                >
                                                    <div className="flex flex-col items-center justify-center w-40 h-52">
                                                        <AiFillPicture fontSize="35px" color="white" />
                                                        <p className="text-white">Sửa ảnh bìa</p>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="ml-12 flex flex-col items-center">
                                    <Button text>Video</Button>
                                    <div className="   w-72 h-[-600] my-4">
                                        <div className="bg-[bg-phone] w-72 h-[-600] bg-cover relative">
                                            <video
                                                muted
                                                controls
                                                className="absolute top-3 left-3 hover:cursor-pointer w-[-280] h-[-542] object-cover rounded-3xl"
                                                loop
                                                src={video}
                                            >
                                                {/* <source src={video} /> */}
                                            </video>
                                        </div>
                                    </div>
                                    <input
                                        type="file"
                                        className="px-2 py-2 border border-gray-300"
                                        accept=".mp4 "
                                        onChange={(e) => handleVideo(e.target.files)}
                                    />
                                </div>
                            </div>

                            <div className="flex">
                                <Button text big>
                                    Hủy bỏ
                                </Button>
                                <Button primary big onClick={handleUpLoadVideo}>
                                    Đăng
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SystemAdmin;
