import { useRef } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import Button from '../Layout/component/Button/Button';
import { useNavigate } from 'react-router-dom';

function UserNotFollow({ fakeVideo }) {
    const videoRef2 = useRef();
    const tick = true;
    const navigate = useNavigate();
    const handleDetailUser = (id) => {
        if (id) {
            navigate(`/user/${id}`);
        }
    };
    return (
        <div>
            {fakeVideo && (
                <div
                    className="w-[-226] h-[-302] relative "
                    onClick={() => {
                        handleDetailUser(fakeVideo?.userId._id);
                    }}
                >
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
                        <source src={fakeVideo.video} />
                    </video>
                    <div
                        className="absolute left-10 right-10 bottom-10 flex flex-col justify-center items-center  text-center"
                        onMouseEnter={() => {
                            videoRef2.current.play();
                        }}
                        onMouseLeave={() => {
                            videoRef2.current.pause();
                        }}
                    >
                        <img
                            className="w-12 h-12 object-cover rounded-[-50%] cursor-pointer"
                            src={fakeVideo.userId.avatar}
                            alt="avatar"
                        />
                        <p className="text-[-18] font-bold text-white  cursor-pointer min-w-44 max-w-56">
                            {fakeVideo.userId.name}
                        </p>
                        <h1 className="flex items-center mb-2 cursor-pointer">
                            <span className="text-[-14] font-semibold text-white ">
                                {fakeVideo.userId.nickName || fakeVideo.userId.name}
                            </span>
                            {/* {fakeVideo.userId.tick} && */}
                            <FaCheckCircle fontSize="14px" color="rgb(32, 213, 236)" className="ml-1" />
                        </h1>
                        <Button noOutline>Follow</Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserNotFollow;
