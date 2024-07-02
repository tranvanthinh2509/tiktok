import { BiEditAlt } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';
import Image from '../Image/Image';
import { useEffect, useRef, useState } from 'react';
import UpdateItemVideoManager from '../UpdateItemVideoManager/UpdateItemVideoManager';
import * as VideoService from '../../services/VideoService';
import { useSelector } from 'react-redux';
import { useMutationHooks } from '../../hooks/useMutationHook';
import swal from 'sweetalert';

function ManagerItemVideo({ avatar, nickName, name, description, video, id, handleCheckRender }) {
    const user = useSelector((state) => state.user);
    const [updateInfoVideo, setUpdateInfoVideo] = useState(false);
    const [detailVideo, setDetailVideo] = useState([]);
    const videoRef2 = useRef();

    const fetchDetailVideo = async (id) => {
        const res = await VideoService.getDetailVideo(id);
        await setDetailVideo(res.data);
    };

    const mutationUpdateVideo = useMutationHooks(async (data) => {
        const { id, access_token, ...rests } = data;
        await VideoService.updateVideo(id, rests, access_token);
    });

    const mutationDeleteUser = useMutationHooks(async (data) => {
        const { id, access_token } = data;
        await VideoService.deleteVideo(id, access_token);
    });

    const handleDetailVideo = async () => {
        await fetchDetailVideo(id);
        await setUpdateInfoVideo(true);
    };

    const handleUpdateVideo = async (stateVideoUpdate) => {
        await setUpdateInfoVideo(false);
        await mutationUpdateVideo.mutate({
            id: id,
            access_token: user.access_token,
            description: stateVideoUpdate.descriptionVideo,
            tag: stateVideoUpdate.tagVideo,
        });
    };

    const handleDeleteVideo = async () => {
        const willDelete = await swal({
            title: 'Xóa Video',
            text: 'Bạn có chắc chắn muốn xóa không',
            icon: 'warning',
            dangerMode: true,
            buttons: true,
        });

        if (willDelete === true) {
            await mutationDeleteUser.mutate({ id: id, access_token: user.access_token });
            await handleCheckRender();
        }
    };

    const { isSuccess: isSuccessUpdate } = mutationUpdateVideo;

    useEffect(() => {
        if (isSuccessUpdate) {
            swal({
                title: 'Success',
                text: 'Đã cập nhật thành công',
                icon: 'success',
            });

            handleCheckRender();
        }
    }, [isSuccessUpdate]);
    return (
        <div>
            {updateInfoVideo && (
                <UpdateItemVideoManager
                    dataVideo={detailVideo}
                    handleSave={handleUpdateVideo}
                    handleClose={() => setUpdateInfoVideo(false)}
                />
            )}
            <ul className="flex w-full">
                <li className="px-3 py-3 w-32 font-semibold  ">
                    <Image src={avatar} className="w-14 h-14 rounded-[-50%] object-cover" />
                </li>
                <li className="px-3 py-3 w-64 font-semibold  ">{nickName}</li>
                <li className="px-3 py-3 w-64 font-semibold  ">{name}</li>
                <li className="px-3 py-3 w-2/5 font-semibold  ">{description}</li>

                <li className="px-3 py-3 w-64 font-semibold  ">
                    <video
                        ref={videoRef2}
                        controls
                        id="2"
                        className="hover:cursor-pointer w-56 h-64 object-cover rounded-lg "
                        // loop
                        // muted
                        // onMouseEnter={() => {
                        //     videoRef2.current.play();
                        // }}
                        // onMouseLeave={() => {
                        //     videoRef2.current.pause();
                        // }}
                        src={video}
                    ></video>
                </li>
                <li className="px-3 py-3 w-32 ">
                    <div className="flex ">
                        <BiEditAlt
                            onClick={handleDetailVideo}
                            fontSize="24px"
                            className="text-[text-primary] mr-2 cursor-pointer hover:opacity-55"
                        />
                        <MdDeleteOutline
                            onClick={handleDeleteVideo}
                            fontSize="24px"
                            className="text-[text-primary] ml-2 hover:opacity-55 cursor-pointer"
                        />
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default ManagerItemVideo;
