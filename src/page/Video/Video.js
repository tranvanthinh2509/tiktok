import { useEffect, useRef, useState } from 'react';
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
import { useParams } from 'react-router-dom';
import * as VideoService from '../../services/VideoService';
import { useQuery } from '@tanstack/react-query';
import Image from '../../component/Image/Image';
import Loading from '../../component/LoadingComponent/Loading';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
function Video() {
    const videoRef = useRef();
    const [play, setPlay] = useState(false);
    const [hoverVideo, setHoverVideo] = useState(false);
    const [showVolume, setShowVolume] = useState(true);
    const { id } = useParams();
    const [videoDetail, setVideoDetail] = useState(null);
    const navigate = useNavigate();
    const fetchDetailVideo = async (id) => {
        console.log('video', id);
        const res = await VideoService.getDetailVideo(id);
        console.log('res ', res);
        setVideoDetail(res.data);
    };

    // const { isLoading, data: videoDetails } = useQuery({
    //     queryKey: ['videos'],
    //     queryFn: fetchDetailVideo,
    // });
    // console.log('video detail ', videoDetails);
    // fetch(`http://localhost:3001/api/video/get-detail/${parasm.id}`)
    //     .then((res) => res.json())
    //     .then((res) => {
    //         console.log('res ', res.data);
    //     });
    useEffect(() => {
        fetchDetailVideo(id);
    }, [id]);
    console.log('video', videoDetail);

    const handlePlay = () => {
        if (play) {
            videoRef.current.pause();
            setPlay(false);
        } else {
            videoRef.current.play();
            setPlay(true);
        }
    };
    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="w-full h-screen">
            {videoDetail !== null ? (
                <div className="flex ">
                    <div className="h-screen w-[-1375] flex justify-center  backdrop-sepia-0 bg-white/3 relative">
                        <video
                            className="fixed  hover:cursor-pointer h-screen w-full object-cover z-[0] opacity-50-"
                            src={videoDetail.video}
                        ></video>

                        <div
                            className="relative"
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
                                className="hover:cursor-pointer h-full mr-5 "
                                loop
                                src={videoDetail.video}
                            ></video>
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
                        <div className="absolute top-3 left-3" onClick={handleBack}>
                            <IoMdClose
                                color="#fff"
                                className="text-5xl px-2 py-2 bg-black rounded-[-50%] hover:opacity-45"
                            />
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
                                            <AccountItemInfo data={videoDetail} />
                                        </Wrapper>
                                    </div>
                                )}
                            >
                                <Image
                                    className="w-10 h-10 object-cover rounded-[-50%] cursor-pointer"
                                    src={videoDetail.userId.avatar}
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
                                                <AccountItemInfo data={videoDetail} />
                                            </Wrapper>
                                        </div>
                                    )}
                                >
                                    <div className="">
                                        <h1 className="text-[-18] font-bold mr-1 leading-6 hover:underline hover:decoration-1 hover:cursor-pointer">
                                            {videoDetail.userId.name}
                                        </h1>
                                        <p className="text-[-16] leading-7">{videoDetail.userId.nickName}</p>
                                    </div>
                                </HeadlessTippy>
                            </div>
                            <div className="">
                                <Button noOutline>Follow</Button>
                            </div>
                        </div>
                        <div className="mt-2">
                            <h1 className="mr-1 text-[-16] font-semibold">{videoDetail.description} </h1>
                            <p className="text-blue-600 text-[-16] font-semibold">{videoDetail.tag}</p>
                        </div>
                        <div className="flex text-center h-6">
                            <span className=" mt-2">
                                <IoMusicalNotesSharp fontSize="14px" />
                            </span>
                            <p className="leading-6 text-[-16] ml-1">{videoDetail.music || 'Nhạc nền'}</p>
                        </div>
                        <div className="action flex mt-3">
                            <div className="flex items-center mr-3  ">
                                <div className=" mr-1 px-2 py-2 rounded-[-50%] bg-slate-200">
                                    <FaHeart fontSize="14px" />
                                </div>
                                <p className="text-xs text-gray-500 font-bold">{videoDetail.liked || '0'}</p>
                            </div>
                            <div className="flex items-center mr-3">
                                <div className=" mr-1 px-2 py-2 rounded-[-50%] bg-slate-200">
                                    <AiFillMessage fontSize="14px" />
                                </div>
                                <p className="text-xs text-gray-500 font-bold">{videoDetail.messaged || '0'}</p>
                            </div>
                            <div className="flex items-center mr-3">
                                <div className=" mr-1 px-2 py-2 rounded-[-50%] bg-slate-200">
                                    <HiBookmark fontSize="14px" />
                                </div>
                                <p className="text-xs text-gray-500 font-bold">{videoDetail.saved || '0'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Loading isLoading={true}>1234</Loading>
            )}
        </div>
    );
}

export default Video;
