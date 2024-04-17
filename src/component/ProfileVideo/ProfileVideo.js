import { useRef } from 'react';
import { LuPlay } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';

function ProfileVideo({ fakeVideo }) {
    const videoRef = useRef();
    const navigate = useNavigate();
    const handleDetailVideo = (id) => {
        navigate(`/profile/video/${id}`);
    };
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
            onDoubleClick={() => handleDetailVideo(fakeVideo._id)}
        >
            <div className="relative">
                <video
                    muted
                    ref={videoRef}
                    className="hover:cursor-pointer w-52 h-64 object-cover mr-4 rounded-md "
                    loop
                    src={fakeVideo.video}
                ></video>
                <div>
                    <div className=" absolute h-10 bottom-1 left-4 flex text-center justify-center text-white">
                        <LuPlay color="#fff" fontSize="22px" />
                        <p className="text-[-16] font-semibold">14.4M</p>
                    </div>
                </div>
            </div>
            <h1 className="mr-1 my-2 text-[-16]  font-semibold leading-5">{fakeVideo.description}</h1>
        </div>
    );
}

export default ProfileVideo;
