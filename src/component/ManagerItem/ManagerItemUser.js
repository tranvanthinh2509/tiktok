import { useEffect, useState } from 'react';
import Image from '../Image/Image';
import { BiEditAlt } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';
import UpdateInfoUser1 from '../UpdateInFoUser1/UpdateInfoUser1';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';

function ManagerItemUser({ avatar, nickName, name, story, level, id, handleCheckRender }) {
    const user = useSelector((state) => state.user);
    const [updateInfoVideo, setUpdateInfoVideo] = useState(false);
    const [stateAccountDetail, setStateAccountDetail] = useState({
        avatarUser: '',
        nickNameUser: '',
        nameUser: '',
        storyUser: '',
        emailUser: '',
        idUser: '',
        levelUser: false,
    });

    const fetchDetailAccount = async (id, access_token) => {
        const res = await UserService.getDetailUser(id, access_token);

        await setStateAccountDetail({
            avatarUser: res.data.avatar,
            nickNameUser: res.data.nickName,
            nameUser: res.data.name,
            storyUser: res.data.story,
            emailUser: res.data.email,
            levelUser: res.data.isAdmin,
            followerUser: res.data.followers.length,
            followingUser: res.data.followings.length,
            idUser: res?.data._id,
        });
    };

    const handleDetailUser = async () => {
        await fetchDetailAccount(id, user.access_token);
        await setUpdateInfoVideo(true);
    };

    const mutationUpdateUser = useMutationHooks(async (data) => {
        const { id, access_token, ...rests } = data;
        await UserService.updateInfoAccount(id, rests, access_token);
    });

    const mutationDeleteUser = useMutationHooks(async (data) => {
        const { id, access_token } = data;
        await UserService.deleteUser(id, access_token);
    });

    const { isSuccess: isSuccessUpdate } = mutationUpdateUser;
    const handleUpdateUser = async (rest) => {
        await setUpdateInfoVideo(false);
        await mutationUpdateUser.mutate({
            id: rest.idUser,
            access_token: user.access_token,
            avatar: rest.avatarUser,
            name: rest.nameUser,
            nickName: rest.nickNameUser,
            isAdmin: rest.levelUser,
            story: rest.storyUser,
        });
    };

    const handleDeleteUser = async () => {
        const willDelete = await swal({
            title: 'Xóa tài khoản',
            text: 'Bạn có chắc chắn muốn xóa không',
            icon: 'warning',
            dangerMode: true,
            buttons: true,
        });

        if (willDelete === true) {
            await mutationDeleteUser.mutate({ id: id, access_token: user.access_token });
            await handleCheckRender();
        }
    };

    useEffect(() => {
        if (isSuccessUpdate) {
            swal({
                title: 'Success',
                text: 'Đã cập nhật thành công',
                icon: 'success',
            });

            handleCheckRender();
        }
    }, [isSuccessUpdate]);

    return (
        <div>
            {updateInfoVideo && (
                <UpdateInfoUser1
                    dataAccount={stateAccountDetail}
                    handleClose={() => setUpdateInfoVideo(false)}
                    handleSave={handleUpdateUser}
                />
            )}

            <ul className="flex items-center w-full border-b border-gray-300">
                <li className="px-3 py-3 w-32">
                    <Image src={avatar} className="w-14 h-14 rounded-[-50%] object-cover" />
                </li>
                <li className="px-3 py-3 w-48 font-semibold">{level === true ? 'Quản lí' : 'Người dùng'}</li>
                <li className="px-3 py-3 w-2/5">{nickName}</li>
                <li className="px-3 py-3 w-2/5">{name}</li>
                <li className="px-3 py-3 w-2/5">{story}</li>
                <li className="px-3 py-3 w-32 ">
                    <div className="flex ">
                        <BiEditAlt
                            fontSize="24px"
                            className="text-[text-primary] mr-2 cursor-pointer hover:opacity-55"
                            onClick={handleDetailUser}
                        />
                        <MdDeleteOutline
                            fontSize="24px"
                            className="text-[text-primary] ml-2 hover:opacity-55 cursor-pointer"
                            onClick={handleDeleteUser}
                        />
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default ManagerItemUser;
