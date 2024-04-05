import Button from '../Layout/component/Button/Button';
import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { AiTwotoneEdit } from 'react-icons/ai';
import Image from '../Image/Image';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as message from '../Message/Message';
import { updateUser } from '../../redux/slides/userSlide';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../LoadingComponent/Loading';
import { getBase64 } from '../../utils';
function UpdateInfoUser({ onClick }) {
    const user = useSelector((state) => state.user);

    const [handleLogin, setHandleLogin] = useState(true);
    const [name, setName] = useState(' ');
    const [nickName, setNickName] = useState(' ');
    const [story, setStory] = useState(' ');
    const [avatar, setAvatar] = useState(' ');
    const mutation = useMutationHooks((data) => {
        const { id, access_token, ...rests } = data;
        UserService.updateInfoUser(id, rests, access_token);
    });

    const dispatch = useDispatch();
    const { data, isPending, isSuccess, isError } = mutation;

    useEffect(() => {
        setName(user?.name);
        setNickName(user?.nickName);
        setStory(user?.story);
        setAvatar(user?.avatar);
    }, [user]);

    useEffect(() => {
        if (isSuccess) {
            message.success();
            handdleGetDetailsUser(user?.id, user?.access_token);
            onClick();
        } else if (isError) {
            message.error();
        }
    }, [isSuccess, isError]);

    const handdleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
    };

    const handleName = (e) => {
        setName(e.target.value);
    };
    const handleNickName = (e) => {
        setNickName(e.target.value);
    };
    const handleStory = (e) => {
        setStory(e.target.value);
    };
    const handleAvatar = (e) => {
        setAvatar(e.target.value);
    };

    const handleOnChangeAvatar = async (fileList) => {
        const file = fileList[0];
        const base64 = await getBase64(file);
        setAvatar(base64.toString());
    };
    const handleSave = () => {
        mutation.mutate({ id: user?.id, name, nickName, story, avatar, access_token: user?.access_token });
    };
    return (
        <div className=" fixed z-30 w-full h-full bg-black bg-opacity-10 ml-2">
            <div className="w-[-700]  bg-white mx-auto -translate-x-1/4 mt-20 rounded-lg">
                <div className="flex relative px-6 pt-6 pb-3 items-center justify-between border-b border-gray-300">
                    <button className={'text-2xl font-semibold'}>Sửa hồ sơ</button>
                    <div className="hover:cursor-pointer " onClick={onClick}>
                        <IoMdClose fontSize="24px" />
                    </div>
                </div>
                <div className="px-6 pt-2 ">
                    <div className="flex relative py-4 border-b border-gray-300">
                        <p className={'text-[-18] leading-6 w-32 font-semibold mr-4 '}>Ảnh hồ sơ</p>
                        <div className="ml-32 relative">
                            <Image src={avatar} alt="oke" className="w-24 h-24 rounded-[-50%] object-cover" />
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
                    <div className="flex relative py-4 border-b border-gray-300">
                        <p className={'text-[-18] leading-6 w-32 font-semibold mr-4 '}>Tên</p>
                        <div className="w-80">
                            <input
                                type="text"
                                value={name}
                                placeholder="Tên"
                                onChange={(e) => handleName(e)}
                                className="w-full outline-none border-none px-3 py-2 bg-gray-200 rounded text-[-16] focus:outline-1 focus:outline focus:outline-gray-600"
                            />
                            <p className="text-xs text-gray-950 mt-2">Bạn chỉ có thể đổi biệt danh 7 ngày 1 lần </p>
                        </div>
                    </div>
                    <div className="flex relative py-4 border-b border-gray-300">
                        <p className={'text-[-18] leading-6 w-32 font-semibold mr-4 '}>Nick name</p>
                        <div className="w-80">
                            <input
                                type="text"
                                value={nickName}
                                placeholder="Nick name"
                                onChange={(e) => handleNickName(e)}
                                className="w-full outline-none border-none px-3 py-2 bg-gray-200 rounded  text-[-16] focus:outline-1 focus:outline focus:outline-gray-600"
                            />
                            <p className="text-xs text-gray-950 mt-2">Bạn chỉ có thể đổi biệt danh 7 ngày 1 lần </p>
                        </div>
                    </div>
                    <div className="flex relative py-4 border-b border-gray-300">
                        <p className={'text-[-18] leading-6 w-32 font-semibold mr-4 '}>Tiểu sử</p>
                        <div className="w-80">
                            <textarea
                                value={story}
                                placeholder="Tiểu sử"
                                onChange={(e) => handleStory(e)}
                                className="w-full h-24 outline-none border-none px-3 py-2 bg-gray-200 rounded  text-[-16] focus:outline-1 focus:outline focus:outline-gray-600"
                            ></textarea>
                            <p className="text-xs text-gray-950 mt-2">3/80</p>
                        </div>
                    </div>
                </div>
                <div className="flex px-12 justify-end items-center py-5">
                    <Button text onClick={onClick}>
                        <p className="text-[-18]  font-semibold ">Hủy</p>
                    </Button>
                    <Button
                        text
                        disabled={
                            name === user.name &&
                            nickName === user.nickName &&
                            story === user.story &&
                            avatar === user.avatar
                        }
                        onClick={handleSave}
                    >
                        <p className="text-[-18]  font-semibold ">Lưu</p>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default UpdateInfoUser;
