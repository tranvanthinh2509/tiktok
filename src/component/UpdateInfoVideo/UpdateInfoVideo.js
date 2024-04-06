import Button from '../Layout/component/Button/Button';
import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import * as VideoService from '../../services/VideoService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as message from '../Message/Message';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../component/LoadingComponent/Loading';
function UpdateInfoVideo({ onClick, dataVideo, loadAllVideo }) {
    const user = useSelector((state) => state.user);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(true);
    const [description, setDesciption] = useState('');
    const [tag, setTag] = useState('');

    useEffect(() => {
        setDesciption(dataVideo?.description);
        setTag(dataVideo?.tag);
        setIsLoadingUpdate(false);
    }, [dataVideo?.description, dataVideo?.tag]);

    const mutation = useMutationHooks((data) => {
        const { id, access_token, ...rests } = data;
        VideoService.updateVideo(id, rests, access_token);
    });

    const dispatch = useDispatch();
    const { data, isPending, isSuccess, isError } = mutation;

    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            console.log('123');
            message.success();
            handleClose();
            // handdleGetDetailsUser(user?.id, user?.access_token);
            // onClick();
        } else if (isError) {
            message.error();
        }
    }, [isSuccess]);

    // const handdleGetDetailsUser = async (id, token) => {
    //     const res = await UserService.getDetailUser(id, token);
    //     dispatch(updateUser({ ...res?.data, access_token: token }));
    // };
    const handleOnChangeDescription = (e) => {
        setDesciption(e.target.value);
    };
    const handleOnChangeTag = (e) => {
        setTag(e.target.value);
    };
    const handleClose = () => {
        setDesciption('');
        setTag('');
        onClick();
    };
    const handleSave = () => {
        mutation.mutate(
            { id: dataVideo.id, access_token: user?.access_token, description, tag },
            {
                onSettled: loadAllVideo(),
            },
        );
        handleClose();
    };
    return (
        <div className="fixed z-30 top-0 left-0 w-full h-full bg-black bg-opacity-10 ">
            <Loading isLoading={isLoadingUpdate}>
                <div className="w-[-700]  bg-white mx-auto mt-20 rounded-lg">
                    <div className="flex relative px-6 pt-6 pb-3 items-center justify-between border-b border-gray-300">
                        <button className={'text-2xl font-semibold'}>Sửa thông tin video</button>
                        <div className="hover:cursor-pointer " onClick={onClick}>
                            <IoMdClose fontSize="24px" />
                        </div>
                    </div>
                    <div className="px-6 pt-2 ">
                        <div className="flex relative py-4 border-b border-gray-300">
                            <p className={'text-[-18] leading-6 w-32 font-semibold mr-4 '}>Video</p>
                            <div className="ml-14 ">
                                <div className=" my-4">
                                    <div>
                                        <video
                                            muted
                                            controls
                                            className="hover:cursor-pointer w-52 h-56 object-cover rounded-3xl"
                                            loop
                                            src={dataVideo?.video}
                                        >
                                            {/* <source src={video} /> */}
                                        </video>
                                        <h1 className="text-[-14] text-gray-500 font-normal italic text-center mt-3">
                                            Không thể sửa video
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex relative py-4 border-b border-gray-300">
                            <p className={'text-[-18] leading-6 w-32 font-semibold mr-4 '}>Chú thích</p>
                            <div className="w-80">
                                <textarea
                                    value={description}
                                    placeholder="Chú thích"
                                    onChange={(e) => handleOnChangeDescription(e)}
                                    className="w-full h-24 outline-none border-none px-3 py-2 bg-gray-200 rounded  text-[-16] focus:outline-1 focus:outline focus:outline-gray-600"
                                ></textarea>
                                <p className="text-xs text-gray-950 mt-2">{description.length}/80</p>
                            </div>
                        </div>
                        <div className="flex relative py-4 border-b border-gray-300">
                            <p className={'text-[-18] leading-6 w-32 font-semibold mr-4 '}>Tag</p>
                            <div className="w-80">
                                <input
                                    type="text"
                                    value={tag}
                                    placeholder="Tag"
                                    onChange={(e) => handleOnChangeTag(e)}
                                    className="w-full outline-none border-none px-3 py-2 bg-gray-200 rounded text-[-16] focus:outline-1 focus:outline focus:outline-gray-600"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex px-12 justify-end items-center py-5">
                        <Button text onClick={onClick}>
                            <p className="text-[-18]  font-semibold ">Hủy</p>
                        </Button>
                        <Button text disabled={tag === user.story && description === user.avatar} onClick={handleSave}>
                            <p className="text-[-18]  font-semibold ">Lưu</p>
                        </Button>
                    </div>
                </div>
            </Loading>
        </div>
    );
}

export default UpdateInfoVideo;
