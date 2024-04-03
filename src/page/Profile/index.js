import Button from '../../component/Layout/component/Button/Button';
import { PiNotePencilBold } from 'react-icons/pi';
import { PiLockKeyFill } from 'react-icons/pi';
import ProfileVideo from '../../component/ProfileVideo/ProfileVideo';
import { useSelector } from 'react-redux';
import Image from '../../component/Image/Image';
import { useEffect, useState } from 'react';
import UpdateInfoUser from '../../component/UpdateInfoUser/UpdateInfoUser';
import { data } from 'jquery';
function Profile() {
    const user = useSelector((state) => state.user);

    const [updateInfoUser, setUpdateInfoUser] = useState(false);
    const [userName, setUserName] = useState('');
    const [userAvatar, setUserAvartar] = useState('');
    useEffect(() => {
        setUserName(user?.name);
        setUserAvartar(user?.avatar);
    }, [user?.name, user?.avatar]);
    const handleUpdateInfoUser = () => {
        setUpdateInfoUser(true);
    };

    return (
        <div>
            {updateInfoUser && (
                <UpdateInfoUser
                    onClick={() => {
                        setUpdateInfoUser(false);
                    }}
                />
            )}
            <div className="mt-16 px-6 pt-8 pb-9">
                <div className="">
                    <div className="flex">
                        <Image
                            className="w-28 h-28 object-cover rounded-[-50%] cursor-pointer mr-3"
                            src={userAvatar}
                            alt="avatar"
                        />
                        <div>
                            <h1 className="text-3xl font-bold mb-1">{userName}</h1>
                            <p className="text-[-18] font-semibold mb-3">
                                {user?.nickName === '' ? user.name : user.nickName}
                            </p>
                            <Button leftIcon={<PiNotePencilBold fontSize="20px" />}>
                                <p className="ml-1 text-[-18] font-semibold" onClick={handleUpdateInfoUser}>
                                    Sửa hồ sơ
                                </p>
                            </Button>
                        </div>
                    </div>
                    <div className="flex mt-5">
                        <div className="flex text-center leading-6 mr-6">
                            <span className="text-[-18] font-semibold mr-2">
                                {user?.following === '' ? '0' : user.following}
                            </span>
                            <span className="text-[-18] font-normal">Đang follow</span>
                        </div>
                        <div className="flex text-center leading-6 mr-6">
                            <span className="text-[-18] font-semibold mr-2">
                                {user?.follower === '' ? '0' : user.follower}
                            </span>
                            <span className="text-[-18] font-normal">Follower</span>
                        </div>
                        <div className="flex text-center leading-6 mr-6">
                            <span className="text-[-18] font-semibold mr-2">{user?.like === '' ? '0' : user.like}</span>
                            <span className="text-[-18] font-normal">Thích</span>
                        </div>
                    </div>
                    <p className="mt-3 text-[-18] font-medium">Chưa có tiểu sử</p>
                </div>
                <div className="mt-3 flex relative before:absolute before:content-[''] before:w-full before:h-0.5 before:bg-gray-200 before:bottom-0">
                    <button className="px-8 py-3 text-gray-600  hover:text-black hover:relative hover:after:absolute hover:after:content-[''] hover:after:w-full hover:after:h-0.5 hover:after:bg-black hover:after:bottom-0 hover:after:left-0">
                        <span className="text-xl ">Video</span>
                    </button>
                    <button className="flex items-center px-8 py-3 text-gray-600  hover:text-black hover:relative hover:after:absolute hover:after:content-[''] hover:after:w-full hover:after:h-0.5 hover:after:bg-black hover:after:bottom-0 hover:after:left-0 ">
                        <PiLockKeyFill fontSize="20px" height="28px" className="mt-1 mr-1" />
                        <span className="text-xl  ">Yêu thích</span>
                    </button>
                    <button className="flex items-center px-8 py-3 text-gray-600  hover:text-black hover:relative hover:after:absolute hover:after:content-[''] hover:after:w-full hover:after:h-0.5 hover:after:bg-black hover:after:bottom-0 hover:after:left-0">
                        <PiLockKeyFill fontSize="20px" height="28px" className="mt-1 mr-1" />
                        <span className="text-xl ">Đã thích</span>
                    </button>
                </div>
                <div className="flex flex-wrap">
                    <ProfileVideo />
                    <ProfileVideo />
                    <ProfileVideo />
                    <ProfileVideo />
                    <ProfileVideo />
                    <ProfileVideo />
                    <ProfileVideo />
                    <ProfileVideo />
                    <ProfileVideo />
                </div>
            </div>
        </div>
    );
}

export default Profile;
