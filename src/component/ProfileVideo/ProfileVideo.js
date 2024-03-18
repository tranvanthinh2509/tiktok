import { useRef } from 'react';
import { LuPlay } from 'react-icons/lu';
import 'tippy.js/dist/tippy.css';

function ProfileVideo() {
    const videoRef = useRef();

    return (
        <div
            index="1"
            className="py-5 w-52 h-auto mr-5"
            onMouseEnter={() => {
                videoRef.current.play();
            }}
            onMouseLeave={() => {
                videoRef.current.pause();
            }}
        >
            <div className="relative">
                <video
                    muted
                    ref={videoRef}
                    className="hover:cursor-pointer w-52 h-64 object-cover mr-4 rounded-md "
                    loop
                >
                    <source src="https://files.fullstack.edu.vn/f8-tiktok/videos/3135-6528128e8d3b6.mp4" />
                </video>
                <div>
                    <div className=" absolute h-10 bottom-1 left-4 flex text-center justify-center text-white">
                        <LuPlay color="#fff" fontSize="22px" />
                        <p className="text-[-16] font-semibold">14.4M</p>
                    </div>
                </div>
            </div>
            <h1 className="mr-1 my-2 text-[-16]  font-semibold leading-5">delivery staff confronting dogs</h1>
        </div>
    );
}

export default ProfileVideo;
