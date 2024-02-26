import { useRef, useState } from 'react';
import Button from '../../component/Layout/component/Button/Button';
import { IoMusicalNotesSharp } from 'react-icons/io5';
import { FaHeart } from 'react-icons/fa';
import { FaShare } from 'react-icons/fa';
import { AiFillMessage } from 'react-icons/ai';
import { HiBookmark } from 'react-icons/hi';
function Home() {
    const videoRef = useRef();
    const [play, setPlay] = useState(true);
    const handlePlay = () => {
        if (play) {
            videoRef.current.pause();
            setPlay(false);
        } else {
            videoRef.current.play();
            setPlay(true);
        }
    };

    return (
        <div className="w-full flex justify-center ">
            <div className="flex py-5 max-w-[-692] justify-between h-auto">
                <img
                    className="w-14 h-14 object-cover rounded-[-50%]"
                    src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/01/luffy-gear-6-2.jpg"
                    alt="avatar"
                />
                <div>
                    <div className="Header flex mb-3">
                        <div className="info w-[-510] ml-3 ">
                            <div className="flex text-center">
                                <h1 className="text-[-18] font-bold mr-1 leading-6">maga.team</h1>
                                <p className="text-[-14] leading-7">maga_team</p>
                            </div>
                            <div className="flex ">
                                <h1 className="mr-1 text-[-18]">delivery staff confronting dogs </h1>
                                <p className="text-blue-600 text-[-18]">#pet #cat #dog #cute #animals</p>
                            </div>
                            <div className="flex text-center h-6">
                                <span className="my-auto">
                                    <IoMusicalNotesSharp fontSize="14px" />
                                </span>
                                <p className="leading-6 text-[-14] ml-1">оригинальный звук - maga_team</p>
                            </div>
                        </div>
                        <div className="">
                            <Button outline>Follow</Button>
                        </div>
                    </div>
                    <div className="h-[-542] flex">
                        <video
                            className="w-[-303] h-[-542] mr-5 "
                            src="../../asset/video/videomau.mp4"
                            type="video/mp4"
                            controls
                        ></video>
                        <div className="action h-[-542] flex flex-col justify-end">
                            <div className="flex-col-reverse text-center">
                                <div className=" my-2 px-3 py-3 rounded-[-50%] bg-slate-200">
                                    <FaHeart fontSize="24px" />
                                </div>
                                <p className="text-xs text-gray-500 font-bold">5001</p>
                            </div>
                            <div className="flex-col-reverse text-center">
                                <div className=" my-2 px-3 py-3 rounded-[-50%] bg-slate-200">
                                    <AiFillMessage fontSize="24px" />
                                </div>
                                <p className="text-xs text-gray-500 font-bold">5003</p>
                            </div>
                            <div className="flex-col-reverse text-center">
                                <div className=" my-2 px-3 py-3 rounded-[-50%] bg-slate-200">
                                    <HiBookmark fontSize="24px" />
                                </div>
                                <p className="text-xs text-gray-500 font-bold">5002</p>
                            </div>

                            <div className="flex-col-reverse text-center">
                                <div className=" my-2 px-3 py-3 rounded-[-50%] bg-slate-200">
                                    <FaShare fontSize="24px" />
                                </div>
                                <p className="text-xs text-gray-500 font-bold">5004</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
