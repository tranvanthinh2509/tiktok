import { useRef, useState } from 'react';
import { LuPlay } from 'react-icons/lu';
import { FaVolumeUp } from 'react-icons/fa';
import { FaVolumeMute } from 'react-icons/fa';
import 'tippy.js/dist/tippy.css';
import { CiHeart } from 'react-icons/ci';

function ExplorerVideo({ fakeUser }) {
    const videoRef = useRef();
    const [hoverVideo, setHoverVideo] = useState(false);
    const [showVolume, setShowVolume] = useState(true);

    return (
        <div
            index="1"
            className="py-5 w-[-382] h-auto"
            onMouseEnter={() => {
                videoRef.current.play();
                setHoverVideo(true);
            }}
            onMouseLeave={() => {
                videoRef.current.pause();
                setHoverVideo(false);
            }}
        >
            <div className="relative">
                <video
                    muted={showVolume ? true : false}
                    ref={videoRef}
                    className="hover:cursor-pointer w-[-382] h-[-510] object-cover mr-5 rounded-xl "
                    loop
                >
                    <source src="https://files.fullstack.edu.vn/f8-tiktok/videos/3135-6528128e8d3b6.mp4" />
                </video>
                <div>
                    <div className=" absolute h-10 bottom-1 left-4 flex text-center justify-center text-white">
                        <LuPlay color="#fff" fontSize="25px" />
                        <p className="text-[-18] font-semibold">14.4M</p>
                    </div>
                </div>
                {hoverVideo && (
                    <div>
                        {showVolume ? (
                            <button
                                className="absolute w-10 h-10 bottom-1 right-4 flex text-center justify-center"
                                onClick={() => {
                                    setShowVolume(false);
                                }}
                            >
                                <FaVolumeMute color="#fff" fontSize="22px" />
                            </button>
                        ) : (
                            <button
                                className="absolute w-10 h-10 bottom-1 right-4 flex text-center justify-center"
                                onClick={() => {
                                    setShowVolume(true);
                                }}
                            >
                                <FaVolumeUp color="#fff" fontSize="22px" />
                            </button>
                        )}
                    </div>
                )}
            </div>

            <h1 className="mr-1 my-2 text-[-18] leading-5">
                delivery staff confronting dogs <p className="text-blue-600 ">#pet #cat #dog #cute #animals</p>{' '}
            </h1>

            <div className="flex items-center ">
                <img
                    className="w-6 h-6 object-cover rounded-[-50%] cursor-pointer mr-1"
                    src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/01/luffy-gear-6-2.jpg"
                    alt="avatar"
                />
                <p className="text-[-18] flex-1 hover:underline hover:decoration-1 hover:cursor-pointer">maga_team</p>
                <div className="flex items-center h">
                    <CiHeart fontSize="20px" color="gray" />
                    <p className=" ml-1 text-[-18] text-gray-400">447.K</p>
                </div>
            </div>
        </div>
    );
}

export default ExplorerVideo;
