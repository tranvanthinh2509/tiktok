import Button from '../../component/Layout/component/Button/Button';
import { PiNotePencilBold } from 'react-icons/pi';
import { PiLockKeyFill } from 'react-icons/pi';
import ProfileVideo from '../../component/ProfileVideo/ProfileVideo';
function Profile() {
    return (
        <div className="mt-16 px-6 pt-8 pb-9">
            <div className="">
                <div className="flex">
                    <img
                        className="w-28 h-28 object-cover rounded-[-50%] cursor-pointer mr-3"
                        src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/01/luffy-gear-6-2.jpg"
                        alt="avatar"
                    />
                    <div>
                        <h1 className="text-3xl font-bold mb-1">maga.team</h1>
                        <p className="text-[-18] font-semibold mb-3">maga.team</p>
                        <Button leftIcon={<PiNotePencilBold fontSize="20px" />}>
                            <p className="ml-1 text-[-18] font-semibold">Sửa hồ sơ</p>
                        </Button>
                    </div>
                </div>
                <div className="flex mt-5">
                    <div className="flex text-center leading-6 mr-6">
                        <span className="text-[-18] font-semibold mr-2">18</span>
                        <span className="text-[-18] font-normal">Đang follow</span>
                    </div>
                    <div className="flex text-center leading-6 mr-6">
                        <span className="text-[-18] font-semibold mr-2">18</span>
                        <span className="text-[-18] font-normal">Follower</span>
                    </div>
                    <div className="flex text-center leading-6 mr-6">
                        <span className="text-[-18] font-semibold mr-2">18</span>
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
    );
}

export default Profile;
