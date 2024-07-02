import { IoMdClose } from 'react-icons/io';
import Button from '../Layout/component/Button/Button';
import Image from '../Image/Image';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';

function UpdateItemVideoManager({ handleClose, dataVideo, handleSave }) {
    const [stateVideoDetail, setStateVideoDetail] = useState({
        descriptionVideo: dataVideo.description,
        tagVideo: dataVideo.tag,
    });

    const handleOnChangeDescription = (e) => {
        setStateVideoDetail({ ...stateVideoDetail, descriptionVideo: e.target.value });
    };

    const handleOnChangeTag = (e) => {
        setStateVideoDetail({ ...stateVideoDetail, tagVideo: e.target.value });
    };
    const close = () => {
        handleClose();
    };

    const handleUpdate = async () => {
        const willUpdate = await swal({
            title: 'Cập nhật Video',
            text: 'Bạn có chắc chắn muốn cập nhật không',
            icon: 'warning',
            dangerMode: true,
            buttons: true,
        });
        if (willUpdate === true) {
            handleSave(stateVideoDetail);
        }
    };

    return (
        <div>
            <div className="fixed z-30 top-0 left-0 w-full h-full bg-black bg-opacity-10 ">
                <div className="w-2/3  bg-white mx-auto mt-20 rounded-lg">
                    <div className="flex relative px-6 pt-6 pb-3 items-center justify-between border-b border-gray-300">
                        <button className={'text-2xl font-semibold'}>Sửa thông tin video</button>
                        <div className="hover:cursor-pointer " onClick={close}>
                            <IoMdClose fontSize="24px" />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-52 h-64 bg-black mx-7 rounded-lg">
                            <video
                                controls
                                id="2"
                                className="hover:cursor-pointer w-full h-full object-cover rounded-lg "
                                // loop
                                // muted
                                // onMouseEnter={() => {
                                //     videoRef2.current.play();
                                // }}
                                // onMouseLeave={() => {
                                //     videoRef2.current.pause();
                                // }}
                                src={dataVideo.video}
                            ></video>
                        </div>
                        <div className="px-6 pt-2 flex-1">
                            <div className="flex relative items-center py-4 border-b border-gray-300">
                                <p className={'text-[-18] leading-6 w-32 font-semibold mr-4 '}>Avatar</p>
                                <div className="ml-32 relative">
                                    <Image
                                        src={dataVideo.userId.avatar}
                                        alt="oke"
                                        className="w-20 h-20 rounded-[-50%] object-cover"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between border-b border-gray-300">
                                <div className="flex relative items-center py-4 ">
                                    <p className={'text-[-18] leading-6 w-32 font-semibold mr-11 '}>Nickname</p>
                                    <div className="w-full relative">
                                        <input
                                            type="text"
                                            value={dataVideo.userId.nickName}
                                            className="w-full outline-none border-none px-3 py-2 bg-gray-50  rounded text-[-16]   italic"
                                        />
                                        <div className="absolute left-3 -bottom-2 text-[text-primary] text-xs italic">
                                            Không thể sửa
                                        </div>
                                    </div>
                                </div>
                                <div className="flex relative items-center py-4 ">
                                    <p className={'text-[-18] leading-6 w-32 font-semibold mr-4 '}>Name</p>
                                    <div className="w-full relative">
                                        <input
                                            type="text"
                                            value={dataVideo.userId.name}
                                            className="w-full outline-none border-none px-3 py-2 bg-gray-50  rounded text-[-16]   italic"
                                        />
                                        <div className="absolute left-3 -bottom-2 text-[text-primary] text-xs italic">
                                            Không thể sửa
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex relative items-center py-4 border-b border-gray-300">
                                <p className={'text-[-18] leading-6 w-32 font-semibold mr-4 '}>Description</p>
                                <div className="w-full">
                                    <input
                                        type
                                        value={stateVideoDetail.descriptionVideo}
                                        onChange={handleOnChangeDescription}
                                        placeholder="Description"
                                        className="w-full outline-none border-none px-3 py-2 bg-gray-100  rounded text-[-16] focus:outline-1 focus:outline focus:outline-gray-600"
                                    />
                                </div>
                            </div>
                            <div className="flex relative items-center py-4 border-b border-gray-300">
                                <p className={'text-[-18] leading-6 w-32 font-semibold mr-4 '}>HagTag</p>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        value={stateVideoDetail.tagVideo}
                                        onChange={handleOnChangeTag}
                                        placeholder="HagTag"
                                        className="w-full outline-none border-none px-3 py-2 bg-gray-100  rounded text-[-16] focus:outline-1 focus:outline focus:outline-gray-600"
                                    />
                                </div>
                            </div>
                            <div className="flex relative items-center py-4 border-b border-gray-300">
                                <p className={'text-[-18] leading-6 w-32 font-semibold mr-4 '}>Ngày đăng</p>
                                <div className="w-full relative">
                                    <input
                                        type="text"
                                        value={dataVideo.createdAt}
                                        className="w-full outline-none border-none px-3 py-2 bg-gray-50  rounded text-[-16]   italic"
                                    />
                                    <div className="absolute left-3 -bottom-2 text-[text-primary] text-xs italic">
                                        Không thể sửa
                                    </div>
                                </div>
                            </div>

                            <div className="flex relative items-center py-4 border-b border-gray-300">
                                <p className={'text-[-18] leading-6 w-32 font-semibold mr-4 '}>Likes</p>
                                <div className="w-full relative">
                                    <input
                                        type="text"
                                        value={dataVideo.liked.length}
                                        className="w-full outline-none border-none px-3 py-2 bg-gray-50  rounded text-[-16]   italic"
                                    />
                                    <div className="absolute left-3 -bottom-2 text-[text-primary] text-xs italic">
                                        Không thể sửa
                                    </div>
                                </div>
                            </div>

                            <div className="flex relative items-center py-4 border-b border-gray-300">
                                <p className={'text-[-18] leading-6 w-32 font-semibold mr-4 '}>Comments</p>
                                <div className="w-full relative">
                                    <input
                                        type="text"
                                        value={dataVideo.comment.length}
                                        className="w-full outline-none border-none px-3 py-2 bg-gray-50  rounded text-[-16]   italic"
                                    />
                                    <div className="absolute left-3 -bottom-2 text-[text-primary] text-xs italic">
                                        Không thể sửa
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex px-12 justify-end items-center py-5">
                        <Button text onClick={close}>
                            <p className="text-[-18]  font-semibold ">Hủy</p>
                        </Button>
                        <Button text onClick={handleUpdate}>
                            <p className="text-[-18]  font-semibold ">Lưu</p>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateItemVideoManager;
