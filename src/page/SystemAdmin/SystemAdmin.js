import images from '../../asset/image/index';
import Image from '../../component/Image/Image';

import 'tippy.js/dist/tippy.css';
import Menu from '../../component/Popper/Menu/Menu';
import { Profile, Logout, Following } from '../../component/Icons';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Button from '../../component/Layout/component/Button/Button';
import { useEffect, useState } from 'react';
import * as VideoService from '../../services/VideoService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import TableComponent from '../../component/Table/TableComponent';
import { useQuery } from '@tanstack/react-query';
import { CiTrash } from 'react-icons/ci';
import { CiEdit } from 'react-icons/ci';
import UpdateInfoVideo from '../../component/UpdateInfoVideo/UpdateInfoVideo';
import QuestionAgainComponent from '../../component/QuestionAgainComponent/QuestionAgainComponent';
import { AiOutlineClose } from 'react-icons/ai';
import { data } from 'jquery';

function SystemAdminUpload() {
    const user = useSelector((state) => state.user);
    const [rowSelected, setRowSelected] = useState('');
    const [updateInfoVideo, setUpdateInfoVideo] = useState(false);
    const [questionAgainComponent, setQuestionAgainComponent] = useState(false);
    const [description, setDesciption] = useState('');
    const handleCancelQuestion = () => {
        setQuestionAgainComponent(false);
    };

    const [tag, setTag] = useState('');

    const [stateVideoDetail, setStateVideoDetail] = useState({
        description: '',
        tag: '',
        video: '',
        id: '',
    });
    const mutation = useMutationHooks((data) => {
        const { id, access_token } = data;
        VideoService.deleteVideo(id, access_token);
    });

    const fetchDetailVideo = async (rowSelected) => {
        const res = await VideoService.getDetailVideo(rowSelected);
        if (res?.data) {
            setStateVideoDetail({
                description: res?.data?.description,
                tag: res?.data?.tag,
                video: res?.data?.video,
                id: res?.data?._id,
            });
        }
    };
    useEffect(() => {
        if (rowSelected) {
            fetchDetailVideo(rowSelected);
        }
    }, [rowSelected]);
    const handleUpdateInfoVideo = () => {
        if (rowSelected) {
            fetchDetailVideo(rowSelected);
        }
        setUpdateInfoVideo(true);
    };

    const handleQuestionAgainComponent = () => {
        if (rowSelected) {
            fetchDetailVideo(rowSelected);
        }

        setQuestionAgainComponent(true);
    };

    const getAllVideo = async () => {
        const res = await VideoService.getAllVideo();
        return res;
    };
    // const { data, isPending, isSuccess, isError } = mutation;
    const querryVideo = useQuery({ queryKey: ['videos'], queryFn: getAllVideo });
    const { isLoading: isLoadingVideo, data: videos } = querryVideo;
    const loadAllVideo = () => querryVideo.refetch();
    const renderAction = () => {
        return (
            <div className="flex">
                <CiTrash fontSize="24px" className="cursor-pointer" onClick={handleQuestionAgainComponent} />
                <CiEdit fontSize="24px" className="ml-2 cursor-pointer" onClick={handleUpdateInfoVideo} />
            </div>
        );
    };
    const handleDeleteVideo = () => {
        mutation.mutate(
            { id: rowSelected, access_token: user?.access_token },
            {
                onSettled: () => {
                    querryVideo.refetch();
                },
            },
        );
        setQuestionAgainComponent(false);
    };
    const columns = [
        {
            title: 'Chú thích',
            dataIndex: 'description',
            sorter: (a, b) => a.description.length - b.description.length,
        },
        {
            title: 'Tag',
            dataIndex: 'tag',
        },
        {
            title: 'Thời gian tạo',
            dataIndex: 'createdAt',
            sorter: (a, b) => a.createdAt.Date - b.createdAt.Date,
        },
        {
            title: 'Video',
            dataIndex: 'video2',
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            render: renderAction,
        },
    ];
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
                                <TableComponent
                                    columns={columns}
                                    videos={videos?.data}
                                    isLoading={isLoadingVideo}
                                    onRow={(record, rowIndex) => {
                                        return {
                                            onClick: (event) => {
                                                setRowSelected(record._id);
                                            },
                                        };
                                    }}
                                />
                                {updateInfoVideo && (
                                    <UpdateInfoVideo
                                        dataVideo={stateVideoDetail}
                                        onClick={() => setUpdateInfoVideo(false)}
                                        loadAllVideo={loadAllVideo}
                                    />
                                )}
                                {questionAgainComponent && (
                                    <QuestionAgainComponent>
                                        <div className="flex h-full items-center justify-center">
                                            <div className="w-96 bg-white p-4">
                                                <div className="flex justify-between items-center">
                                                    <h1 className="font-bold text-[-18]">Xóa sản phẩm</h1>
                                                    <div onClick={handleCancelQuestion}>
                                                        <AiOutlineClose />
                                                    </div>
                                                </div>
                                                <p className="pt-2 pb-8">Bạn có muốn xóa không ?</p>
                                                <div className="flex flex-row-reverse">
                                                    <Button primary onClick={handleDeleteVideo}>
                                                        Xóa
                                                    </Button>
                                                    <Button text onClick={handleCancelQuestion}>
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </QuestionAgainComponent>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SystemAdminUpload;
