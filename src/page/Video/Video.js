import { useRef, useState } from 'react';
import Button from '../../component/Layout/component/Button/Button';
import { IoMusicalNotesSharp } from 'react-icons/io5';
import { FaHeart } from 'react-icons/fa';
import { FaShare } from 'react-icons/fa';
import { AiFillMessage } from 'react-icons/ai';
import { HiBookmark } from 'react-icons/hi';
import { FaPlay } from 'react-icons/fa';
import { FaVolumeUp } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';
import { FaVolumeMute } from 'react-icons/fa';
import { Slider } from '@material-tailwind/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { Wrapper } from '../../component/Popper';
import AccountItemInfo from '../../component/AccountItemInfo/AccountItemInfo';
function Video() {
    const videoRef = useRef();
    const [play, setPlay] = useState(false);
    const [hoverVideo, setHoverVideo] = useState(false);
    const [showVolume, setShowVolume] = useState(true);
    const handlePlay = () => {
        if (play) {
            videoRef.current.pause();
            setPlay(false);
        } else {
            videoRef.current.play();
            setPlay(true);
        }
    };
    const fakeUser = {
        id: 2,
        first_name: 'Đào Lê',
        last_name: 'Phương Hoa',
        full_name: 'Đào Lê Phương Hoa',
        nickname: 'hoaahanassii',
        avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/2/627394cb56d66.jpg',
        bio: '✨ 1998 ✨\nVietnam 🇻🇳\nĐỪNG LẤY VIDEO CỦA TÔI ĐI SO SÁNH NỮA. XIN HÃY TÔN TRỌNG !',
        tick: true,
        followings_count: 1,
        followers_count: 77,
        likes_count: 1000,
        website_url: 'https://fullstack.edu.vn/',
        facebook_url: '',
        youtube_url: '',
        twitter_url: '',
        instagram_url: '',
        created_at: '2022-05-05 23:10:05',
        updated_at: '2022-05-05 23:11:39',
    };
    return (
        <div className="w-full h-[-911]">
            <div className="flex ">
                <div className="h-full w-[-1375] flex justify-center bg-gray-900 backdrop-sepia-0 bg-white/3">
                    <div
                        className="relative   "
                        onMouseEnter={() => {
                            setHoverVideo(true);
                        }}
                        onMouseLeave={() => {
                            setHoverVideo(false);
                        }}
                    >
                        <video
                            muted={showVolume ? true : false}
                            ref={videoRef}
                            onClick={handlePlay}
                            className="hover:cursor-pointer h-[-911] mr-5 "
                            loop
                        >
                            <source src="https://files.fullstack.edu.vn/f8-tiktok/videos/3135-6528128e8d3b6.mp4" />
                        </video>
                        {hoverVideo && (
                            <div>
                                {play ? (
                                    <button
                                        onClick={handlePlay}
                                        className="absolute w-10 h-10 bottom-8 left-6 flex text-center justify-center"
                                    >
                                        <FaPause color="#fff" fontSize="20px" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handlePlay}
                                        className=" absolute w-10 h-10 bottom-8 left-6 flex text-center justify-center"
                                    >
                                        <FaPlay color="#fff" fontSize="20px" />
                                    </button>
                                )}
                            </div>
                        )}
                        {showVolume ? (
                            <button
                                className="absolute w-10 h-10 bottom-7 right-8 flex text-center justify-center"
                                onClick={() => {
                                    setShowVolume(false);
                                }}
                            >
                                <FaVolumeMute color="#fff" fontSize="22px" />
                            </button>
                        ) : (
                            <button
                                className="absolute w-10 h-10 bottom-7 right-8 flex text-center justify-center"
                                onClick={() => {
                                    setShowVolume(true);
                                }}
                            >
                                <FaVolumeUp color="#fff" fontSize="22px" />
                            </button>
                        )}
                    </div>
                </div>
                <div className="py-5 max-w-[-692] h-auto ml-6">
                    <div className="flex items-center">
                        <HeadlessTippy
                            delay={[200, 200]}
                            placement="bottom-start"
                            interactive
                            render={(atr) => (
                                <div className="w-80 shadow-[-wrapper] rounded-[-8]" tabIndex="-1" {...atr}>
                                    <Wrapper>
                                        <AccountItemInfo data={fakeUser} />
                                    </Wrapper>
                                </div>
                            )}
                        >
                            <img
                                className="w-10 h-10 object-cover rounded-[-50%] cursor-pointer"
                                src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/01/luffy-gear-6-2.jpg"
                                alt="avatar"
                            />
                        </HeadlessTippy>
                        <div className="info w-80 ml-2">
                            <HeadlessTippy
                                delay={[200, 200]}
                                placement="bottom-start"
                                interactive
                                render={(atr) => (
                                    <div className="w-80 shadow-[-wrapper] rounded-[-8]" tabIndex="-1" {...atr}>
                                        <Wrapper>
                                            <AccountItemInfo data={fakeUser} />
                                        </Wrapper>
                                    </div>
                                )}
                            >
                                <div className="">
                                    <h1 className="text-[-18] font-bold mr-1 leading-6 hover:underline hover:decoration-1 hover:cursor-pointer">
                                        maga.team
                                    </h1>
                                    <p className="text-[-16] leading-7">maga_team</p>
                                </div>
                            </HeadlessTippy>
                        </div>
                        <div className="">
                            <Button noOutline>Follow</Button>
                        </div>
                    </div>
                    <div className="flex mt-2">
                        <h1 className="mr-1 text-[-16] font-semibold">delivery staff confronting dogs </h1>
                        <p className="text-blue-600 text-[-16] font-semibold">#pet #cat #dog #cute #animals</p>
                    </div>
                    <div className="flex text-center h-6">
                        <span className=" mt-2">
                            <IoMusicalNotesSharp fontSize="14px" />
                        </span>
                        <p className="leading-6 text-[-16] ml-1">оригинальный звук - maga_team</p>
                    </div>
                    <div className="action flex mt-3">
                        <div className="flex items-center mr-3  ">
                            <div className=" mr-1 px-2 py-2 rounded-[-50%] bg-slate-200">
                                <FaHeart fontSize="14px" />
                            </div>
                            <p className="text-xs text-gray-500 font-bold">5001</p>
                        </div>
                        <div className="flex items-center mr-3">
                            <div className=" mr-1 px-2 py-2 rounded-[-50%] bg-slate-200">
                                <AiFillMessage fontSize="14px" />
                            </div>
                            <p className="text-xs text-gray-500 font-bold">5003</p>
                        </div>
                        <div className="flex items-center mr-3">
                            <div className=" mr-1 px-2 py-2 rounded-[-50%] bg-slate-200">
                                <HiBookmark fontSize="14px" />
                            </div>
                            <p className="text-xs text-gray-500 font-bold">5002</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Video;
