import Button from '../Layout/component/Button/Button';
import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import * as VideoService from '../../services/VideoService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as message from '../Message/Message';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../component/LoadingComponent/Loading';
import Image from '../Image/Image';
import axios from 'axios';
import { AiTwotoneEdit } from 'react-icons/ai';
import swal from 'sweetalert';

function UpdateInfoUser1({ handleClose, dataAccount, handleSave }) {
    const [stateAccountDetail, setStateAccountDetail] = useState({
        avatarUser: dataAccount.avatarUser,
        nickNameUser: dataAccount.nickNameUser,
        nameUser: dataAccount.nameUser,
        storyUser: dataAccount.storyUser,
        emailUser: dataAccount.emailUser,
        levelUser: dataAccount.levelUser,
        idUser: dataAccount.idUser,
    });
    const close = () => {
        handleClose();
    };

    const handleOnChangeNickName = (e) => {
        setStateAccountDetail({ ...stateAccountDetail, nickNameUser: e.target.value });
    };
    const handleOnChangeName = (e) => {
        setStateAccountDetail({ ...stateAccountDetail, nameUser: e.target.value });
    };
    const handleOnChangeStory = (e) => {
        setStateAccountDetail({ ...stateAccountDetail, storyUser: e.target.value });
    };
    const handleOnChangeAvatar = async (fileList) => {
        const file = fileList[0];

        // const base64 = await getBase64(file);
        // setAvatar(base64.toString());

        const fomrData = new FormData();
        fomrData.append('file', file);
        fomrData.append('upload_preset', 'uploadVideo');

        axios
            .post(`https://api.cloudinary.com/v1_1/dzcgxdbbw/image/upload`, fomrData)
            .then((res) => setStateAccountDetail({ ...stateAccountDetail, avatarUser: res.data.url }))
            .catch((err) => console.log(err));
    };

    const handleOnChangeLevel = (e) => {
        setStateAccountDetail({ ...stateAccountDetail, levelUser: e.target.value });
    };

    const handleUpdate = async () => {
        const willUpdate = await swal({
            title: 'Cập nhật tài khoản',
            text: 'Bạn có chắc chắn muốn cập nhật không',
            icon: 'warning',
            dangerMode: true,
            buttons: true,
        });
        if (willUpdate === true) {
            handleSave(stateAccountDetail);
        }
    };

    return (
        <div>
            <div className="fixed z-30 top-0 left-0 w-full h-full bg-black bg-opacity-10 ">
                <div className="w-[-700]  bg-white mx-auto mt-20 rounded-lg">
                    <div className="flex relative px-6 pt-6 pb-3 items-center justify-between border-b border-gray-300">
                        <button className={'text-2xl font-semibold'}>Sửa thông tin người dùng</button>
                        <div className="hover:cursor-pointer " onClick={close}>
                            <IoMdClose fontSize="24px" />
                        </div>
                    </div>
                    <div className="px-6 pt-2 ">
                        <div className="flex relative items-center py-4 border-b border-gray-300">
                            <p className={'text-[-18] leading-6 w-32 font-semibold mr-4 '}>Avatar</p>
                            <div className="ml-32 relative">
                                <Image
                                    src={stateAccountDetail.avatarUser}
                                    alt="oke"
                                    className="w-24 h-24 rounded-[-50%] object-cover"
                                />
                                <div>
                                    <input
                                        type="file"
                                        name="avatarFile"
                                        id="avatarFile"
                                        fileList
                                        accept=".jpeg, .jpg, .png, .webg, .svg"
                                        onChange={(e) => handleOnChangeAvatar(e.target.files)}
                                        className="opacity-0 h-0 w-0 cursor-pointer"
                                        maxCount={1}
                                    />
                                    <label for="avatarFile" className="absolute bottom-5 right-0">
                                        <div className="px-2 py-2 rounded-[-50%] border border-gray-300 bg-white">
                                            <AiTwotoneEdit fontSize="18px" />
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="flex relative items-center py-4 border-b border-gray-300">
                            <p className={'text-[-18] leading-6 w-32 font-semibold mr-4 '}>Quyền</p>
                            <div className="w-full">
                                <select
                                    className="px-2 py-2 text-[-16]"
                                    value={stateAccountDetail.levelUser}
                                    onChange={handleOnChangeLevel}
                                >
                                    <option value={true}>Quản lí</option>
                                    <option value={false}>Người dùng</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex relative items-center py-4 border-b border-gray-300">
                            <p className={'text-[-18] leading-6 w-32 font-semibold mr-4 '}>Nickname</p>
                            <div className="w-full">
                                <input
                                    type="text"
                                    value={stateAccountDetail.nickNameUser}
                                    onChange={handleOnChangeNickName}
                                    placeholder="Nickname"
                                    className="w-full outline-none border-none px-3 py-2 bg-gray-100  rounded text-[-16] focus:outline-1 focus:outline focus:outline-gray-600"
                                />
                            </div>
                        </div>
                        <div className="flex relative items-center py-4 border-b border-gray-300">
                            <p className={'text-[-18] leading-6 w-32 font-semibold mr-4 '}>Name</p>
                            <div className="w-full">
                                <input
                                    type="text"
                                    value={stateAccountDetail.nameUser}
                                    onChange={handleOnChangeName}
                                    placeholder="Name"
                                    className="w-full outline-none border-none px-3 py-2 bg-gray-100  rounded text-[-16] focus:outline-1 focus:outline focus:outline-gray-600"
                                />
                            </div>
                        </div>
                        <div className="flex relative items-center py-4 border-b border-gray-300">
                            <p className={'text-[-18] leading-6 w-32 font-semibold mr-4 '}>Story</p>
                            <div className="w-full">
                                <input
                                    type="text"
                                    value={stateAccountDetail.storyUser}
                                    onChange={handleOnChangeStory}
                                    placeholder="Story"
                                    className="w-full outline-none border-none px-3 py-2 bg-gray-100  rounded text-[-16] focus:outline-1 focus:outline focus:outline-gray-600"
                                />
                            </div>
                        </div>

                        <div className="flex relative items-center py-4 border-b border-gray-300">
                            <p className={'text-[-18] leading-6 w-32 font-semibold mr-4 '}>Email</p>
                            <div className="w-full relative">
                                <input
                                    type="text"
                                    value={stateAccountDetail.emailUser}
                                    className="w-full outline-none border-none px-3 py-2 bg-gray-50  rounded text-[-16]   italic"
                                />
                                <div className="absolute left-3 -bottom-2 text-[text-primary] text-xs italic">
                                    Không thể sửa
                                </div>
                            </div>
                        </div>

                        <div className="flex relative items-center py-4 border-b border-gray-300">
                            <p className={'text-[-18] leading-6 w-32 font-semibold mr-4 '}>Followers</p>
                            <div className="w-full relative">
                                <input
                                    type="text"
                                    value={dataAccount.followerUser}
                                    className="w-full outline-none border-none px-3 py-2 bg-gray-50  rounded text-[-16]   italic"
                                />
                                <div className="absolute left-3 -bottom-2 text-[text-primary] text-xs italic">
                                    Không thể sửa
                                </div>
                            </div>
                        </div>

                        <div className="flex relative items-center py-4 border-b border-gray-300">
                            <p className={'text-[-18] leading-6 w-32 font-semibold mr-4 '}>Followings</p>
                            <div className="w-full relative">
                                <input
                                    type="text"
                                    value={dataAccount.followingUser}
                                    className="w-full outline-none border-none px-3 py-2 bg-gray-50  rounded text-[-16]   italic"
                                />
                                <div className="absolute left-3 -bottom-2 text-[text-primary] text-xs italic">
                                    Không thể sửa
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

export default UpdateInfoUser1;
