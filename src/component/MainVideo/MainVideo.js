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
import Image from '../Image/Image';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService';
import * as VideoService from '../../services/VideoService';
import moment from 'moment';
import ReactSlider from 'react-slider';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function MainVideo({ fakeUser, isPending }) {
    const user = useSelector((state) => state.user);
    const videoRef = useRef(null);
    const [play, setPlay] = useState(false);
    const [hoverVideo, setHoverVideo] = useState(false);
    const [showVolume, setShowVolume] = useState(true);
    const [timeMin, setTimeMin] = useState(0);
    const [timeMax, setTimeMax] = useState(0);
    const [timeCurrent, setTimeCurrent] = useState(0);
    // const [followed, setFollowed] = useState(false);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        // setFollowed(user.followings.includes(`${fakeUser.userId._id}`));
        setLiked(fakeUser?.liked.includes(`${user.id}`));
    }, [user, fakeUser]);
    const [likedLength, setLikedLength] = useState(fakeUser?.liked.length);
    const [commentLength, setcommentLength] = useState(fakeUser?.comment.length);
    useEffect(() => {
        setLikedLength(fakeUser?.liked.length);
        setcommentLength(fakeUser?.comment.length);
    }, [fakeUser]);

    const mutationLike = useMutationHooks((data) => {
        const { id, userId } = data;
        VideoService.likeVideo(id, { userId: userId });
    });

    const handleOnchangeLike = () => {
        if (user.id) {
            mutationLike.mutate({ id: fakeUser._id, userId: user.id });
            setLiked(!liked);
            setLikedLength(!liked ? likedLength + 1 : likedLength - 1);
        }
    };

    // Cannel funtion follow
    // const handleOnchangeFollow = () => {
    //     if (user.id) {
    //         mutation.mutate({ id: fakeUser.userId._id, userId: user.id });
    //         setFollowed(!followed);
    //     }
    // };
    // const handleOnchangeUnFollow = () => {
    //     if (user.id) {
    //         mutation1.mutate({ id: fakeUser.userId._id, userId: user.id });
    //         setFollowed(!followed);
    //     }
    // };
    const navigate = useNavigate();
    const handlePlay = () => {
        if (play) {
            videoRef.current.pause();
            setPlay(false);
        } else {
            videoRef.current.play();
            setPlay(true);
        }
    };
    const handleDetailVideo = (id) => {
        navigate(`/profile/video/${id}`);
    };
    const handleDetailUser = (id) => {
        if (id !== user.id) {
            navigate(`/user/${id}`);
        }
    };

    const formatTime = (createdAt) => {
        return moment(createdAt).fromNow();
    };

    const handleTimeUpdate = () => {
        setTimeCurrent(videoRef.current.currentTime);
    };
    const handleLoadedData = () => {
        setTimeMax(videoRef.current.duration);
    };
    const handleSliderChange = (value) => {
        videoRef.current.currentTime = value;
        setTimeCurrent(value);
    };
    return (
        <div index="1" className="flex py-5 max-w-[-692] justify-between h-auto ">
            <HeadlessTippy
                delay={[200, 200]}
                placement="bottom-start"
                interactive
                render={(atr) => (
                    <div className="w-80 shadow-[-wrapper] rounded-[-8]" tabIndex="-1" {...atr}>
                        {isPending || (
                            <Wrapper>
                                <AccountItemInfo data={fakeUser} />
                            </Wrapper>
                        )}
                    </div>
                )}
            >
                <Image
                    className="w-14 h-14 object-cover rounded-[-50%] cursor-pointer"
                    src={isPending ? null : fakeUser?.userId?.avatar}
                    alt="avatar"
                    onClick={() => {
                        handleDetailUser(fakeUser.userId._id);
                    }}
                />
            </HeadlessTippy>
            <div className=" ml-3 flex-1">
                <div className="Header flex mb-3">
                    <div className="info w-[-510] ">
                        <HeadlessTippy
                            delay={[200, 200]}
                            placement="bottom-start"
                            interactive
                            render={(atr) => (
                                <div className="w-80 shadow-[-wrapper] rounded-[-8]" tabIndex="-1" {...atr}>
                                    {isPending || (
                                        <Wrapper>
                                            <AccountItemInfo data={fakeUser} />
                                        </Wrapper>
                                    )}
                                </div>
                            )}
                        >
                            <div className="flex text-center ">
                                <h1
                                    className="text-[-18] font-bold mr-1 leading-6 hover:underline hover:decoration-1 hover:cursor-pointer"
                                    onClick={() => {
                                        isPending || handleDetailUser(fakeUser.userId._id);
                                    }}
                                >
                                    {isPending ? (
                                        <Skeleton width="100px" height="18px" count={1} />
                                    ) : (
                                        fakeUser?.userId?.name
                                    )}
                                </h1>

                                <p className="text-[-14] leading-7">
                                    {isPending ? (
                                        <Skeleton width="60px" height="14px" count={1} />
                                    ) : (
                                        fakeUser?.userId?.nickName
                                    )}
                                </p>
                            </div>
                        </HeadlessTippy>
                        <span className="text-xs text-gray-800">
                            {isPending ? (
                                <Skeleton width="80px" height="16px" count={1} />
                            ) : (
                                formatTime(fakeUser?.createdAt)
                            )}
                        </span>
                        <div className="w-11/12">
                            <h1 className="mr-1 text-[-18]">
                                {isPending ? <Skeleton width="300px" height="18px" count={1} /> : fakeUser?.description}
                            </h1>
                            <p className="text-blue-600 text-[-18]">
                                {isPending ? (
                                    <Skeleton width="300px" height="18px" count={1} />
                                ) : (
                                    fakeUser?.tag || '#Xuhuong'
                                )}
                            </p>
                        </div>
                        {isPending ? (
                            <Skeleton width="40px" height="14px" count={1} />
                        ) : (
                            <div className="flex text-center h-6">
                                <span className="my-auto">
                                    <IoMusicalNotesSharp fontSize="14px" />
                                </span>
                                <p className="leading-6 text-[-14] ml-1">{fakeUser?.music || 'Nhạc nền'}</p>
                            </div>
                        )}
                    </div>
                    <div className="w-28">
                        {/* {fakeUser.userId._id === user.id || (
                            <div>
                                {' '}
                                {followed ? (
                                    <Button text onClick={handleOnchangeUnFollow}>
                                        Đang follow
                                    </Button>
                                ) : (
                                    <Button outline onClick={handleOnchangeFollow}>
                                        Follow
                                    </Button>
                                )}
                            </div>
                        )} */}
                    </div>
                </div>

                <div className="h-[-700] flex ">
                    {isPending ? (
                        <Skeleton width="400px" height="700px" count={1} />
                    ) : (
                        <div
                            onDoubleClick={() => handleDetailVideo(fakeUser._id)}
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
                                onClick={(e) => handlePlay(e)}
                                className="hover:cursor-pointer h-[-700] object-cover rounded-xl "
                                loop
                                src={fakeUser?.video}
                                onTimeUpdate={handleTimeUpdate}
                                onLoadedData={handleLoadedData}
                            ></video>
                            {hoverVideo && (
                                <div>
                                    {play ? (
                                        <button
                                            onClick={handlePlay}
                                            className="absolute w-10 h-10 bottom-2 left-0 flex text-center justify-center"
                                        >
                                            <FaPause color="#fff" fontSize="20px" />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handlePlay}
                                            className=" absolute w-10 h-10 bottom-2 left-0 flex text-center justify-center"
                                        >
                                            <FaPlay color="#fff" fontSize="20px" />
                                        </button>
                                    )}
                                </div>
                            )}
                            {showVolume ? (
                                <button
                                    className="absolute w-10 h-10 bottom-2 right-0 flex text-center justify-center"
                                    onClick={() => {
                                        setShowVolume(false);
                                    }}
                                >
                                    <FaVolumeMute color="#fff" fontSize="22px" />
                                </button>
                            ) : (
                                <button
                                    className="absolute w-10 h-10 bottom-2 right-0 flex text-center justify-center"
                                    onClick={() => {
                                        setShowVolume(true);
                                    }}
                                >
                                    <FaVolumeUp color="#fff" fontSize="22px" />
                                </button>
                            )}

                            <div className="absolute bottom-0 left-0 right-0 w-full ">
                                <ReactSlider
                                    className="horizontal-slider"
                                    thumbClassName="example-thumb"
                                    trackClassName="example-track"
                                    min={timeMin}
                                    max={timeMax}
                                    value={timeCurrent}
                                    onChange={handleSliderChange}
                                    step={0.01}
                                    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                                />
                            </div>
                        </div>
                    )}
                    <div className="action h-full flex flex-col justify-end ml-5">
                        {isPending ? (
                            <Skeleton className="my-2 px-3 py-3 " />
                        ) : (
                            <div className="flex-col-reverse text-center">
                                {liked ? (
                                    <div
                                        className=" my-2 px-3 py-3 rounded-[-50%] bg-slate-200"
                                        onClick={handleOnchangeLike}
                                    >
                                        <FaHeart fontSize="24px" color="red" />
                                    </div>
                                ) : (
                                    <div
                                        className=" my-2 px-3 py-3 rounded-[-50%] bg-slate-200"
                                        onClick={handleOnchangeLike}
                                    >
                                        <FaHeart fontSize="24px" />
                                    </div>
                                )}

                                <p className="text-xs text-gray-500 font-bold">{likedLength}</p>
                            </div>
                        )}
                        {isPending ? (
                            <Skeleton className="my-2 px-3 py-3 " />
                        ) : (
                            <div className="flex-col-reverse text-center ">
                                <div className=" my-2 px-3 py-3 rounded-[-50%] bg-slate-200">
                                    <AiFillMessage fontSize="24px" />
                                </div>
                                <p className="text-xs text-gray-500 font-bold">{commentLength}</p>
                            </div>
                        )}
                        {isPending ? (
                            <Skeleton className="my-2 px-3 py-3 " />
                        ) : (
                            <div className="flex-col-reverse text-center">
                                <div className=" my-2 px-3 py-3 rounded-[-50%] bg-slate-200">
                                    <HiBookmark fontSize="24px" />
                                </div>
                                <p className="text-xs text-gray-500 font-bold">{fakeUser?.liked.lenght || 0}</p>
                            </div>
                        )}
                        {isPending ? (
                            <Skeleton className="my-2 px-3 py-3 " />
                        ) : (
                            <div className="flex-col-reverse text-center">
                                <div className=" my-2 px-3 py-3 rounded-[-50%] bg-slate-200">
                                    <FaShare fontSize="24px" />
                                </div>
                                <p className="text-xs text-gray-500 font-bold">{fakeUser?.liked.lenght || 0}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainVideo;
