import { useRef } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import Button from '../Layout/component/Button/Button';

function UserNotFollow() {
    const videoRef2 = useRef();
    const tick = true;

    return (
        <div className="w-[-226] h-[-302] relative ">
            <video
                ref={videoRef2}
                id="2"
                className="hover:cursor-pointer w-full h-full object-cover rounded-lg "
                loop
                muted
                onMouseEnter={() => {
                    videoRef2.current.play();
                }}
                onMouseLeave={() => {
                    videoRef2.current.pause();
                }}
            >
                <source src="https://files.fullstack.edu.vn/f8-tiktok/videos/3111-6512ef7cca749.mp4" />
            </video>
            <div
                className="absolute top-24 left-10 right-10 bottom-0 flex flex-col justify-center items-center  "
                onMouseEnter={() => {
                    videoRef2.current.play();
                }}
                onMouseLeave={() => {
                    videoRef2.current.pause();
                }}
            >
                <img
                    className="w-12 h-12 object-cover rounded-[-50%] cursor-pointer"
                    src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/01/luffy-gear-6-2.jpg"
                    alt="avatar"
                />
                <p className="text-[-18] font-bold text-white text-gray-500 mt cursor-pointer">maga_team</p>
                <h1 className="flex items-center mb-2 cursor-pointer">
                    <span className="text-[-14] font-semibold text-white">maga.team</span>
                    {tick && <FaCheckCircle fontSize="12px" color="rgb(32, 213, 236)" className="ml-1" />}
                </h1>
                <Button noOutline>Follow</Button>
            </div>
        </div>
    );
}

export default UserNotFollow;
