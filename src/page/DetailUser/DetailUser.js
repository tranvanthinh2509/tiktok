import Button from '../../component/Layout/component/Button/Button';
import { PiLockKeyFill } from 'react-icons/pi';
import ProfileVideo from '../../component/ProfileVideo/ProfileVideo';
import { useDispatch, useSelector } from 'react-redux';
import Image from '../../component/Image/Image';
import { useEffect, useState } from 'react';
import * as VideoService from '../../services/VideoService';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { useParams } from 'react-router-dom';
import Loading from '../../component/LoadingComponent/Loading';
import { updateUser } from '../../redux/slides/userSlide';
import NewLoading from '../../component/NewLoading';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
function DetailUser() {
    const user = useSelector((state) => state.user);
    const [videoOfMe, setVideoOfMe] = useState([]);
    const [userDetail, setUserDetail] = useState({});

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [followed, setFollowed] = useState(false);

    const mutationOneUser = useMutationHooks(async (data) => {
        const { id } = data;
        const res = await UserService.getOnelUser(id);
        setUserDetail(res.data);
        setLoading(false);
    });

    const dispatch = useDispatch();

    useEffect(() => {
        mutationOneUser.mutate({ id: id });
    }, [id]);

    const mutation = useMutationHooks(async (data) => {
        const { id } = data;
        const res = await VideoService.getVideoOfMe(id);
        setVideoOfMe(res.data);
        setFollowed(user.followings.includes(userDetail._id));
    });
    const { isPending } = mutation;
    const mutationFollow = useMutationHooks((data) => {
        const { id, userId } = data;
        UserService.followUser(id, { userId: userId });
    });
    const mutationUnFollow = useMutationHooks((data) => {
        const { id, userId } = data;
        UserService.unfollowUser(id, { userId: userId });
    });
    const handleOnchangeFollow = () => {
        if (user.id) {
            mutationFollow.mutate({ id: userDetail._id, userId: user.id });
            setFollowed(!followed);
            handleGetDetailUser(user.id, user.access_token);
        }
    };

    const handleOnchangeUnFollow = () => {
        if (user.id) {
            mutationUnFollow.mutate({ id: userDetail._id, userId: user.id });
            setFollowed(!followed);
            handleGetDetailUser(user.id, user.access_token);
        }
    };

    const handleGetDetailUser = async (id, token) => {
        const res = await UserService.getDetailUser(id, token);
        await dispatch(updateUser({ ...res?.data, access_token: token }));
    };
    useEffect(() => {
        if (user) {
            mutation.mutate({ id: userDetail._id });
        }
    }, [userDetail]);

    return (
        <div>
            {/* {loading && <NewLoading isLoading={loading} />} */}

            <div className="mt-16 px-6 pt-8 pb-9">
                <div className="">
                    <div className="flex">
                        <Image
                            className="w-28 h-28 object-cover rounded-[-50%] cursor-pointer mr-3"
                            src={userDetail?.avatar}
                            alt="avatar"
                        />
                        <div>
                            <h1 className="text-3xl font-bold mb-1">{userDetail?.name || <Skeleton />}</h1>
                            <p className="text-[-18] font-semibold mb-3">
                                {userDetail?.name ? (
                                    userDetail?.nickName === '' ? (
                                        userDetail?.name
                                    ) : (
                                        userDetail?.nickName
                                    )
                                ) : (
                                    <Skeleton />
                                )}
                            </p>
                            {isPending ? (
                                <Skeleton count={1} height="30px" />
                            ) : (
                                <div>
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
                            )}
                        </div>
                    </div>
                    {userDetail?.name ? (
                        <div className="flex mt-5">
                            <div className="flex text-center leading-6 mr-6">
                                <span className="text-[-18] font-semibold mr-2">
                                    {userDetail?.followings?.length || 0}
                                </span>
                                <span className="text-[-18] font-normal">Đang follow</span>
                            </div>

                            <div className="flex text-center leading-6 mr-6">
                                <span className="text-[-18] font-semibold mr-2">
                                    {userDetail?.followers?.length || 0}
                                </span>
                                <span className="text-[-18] font-normal">Follower</span>
                            </div>
                            <div className="flex text-center leading-6 mr-6">
                                <span className="text-[-18] font-semibold mr-2">0</span>
                                <span className="text-[-18] font-normal">Thích</span>
                            </div>
                        </div>
                    ) : (
                        <Skeleton width="100px" heigth="18px" style={{ marginTop: '25px' }} count={1} />
                    )}

                    <p className="mt-3 text-[-18] font-medium">
                        {userDetail?.name ? userDetail?.story : <Skeleton width="10%" />}
                    </p>
                </div>

                <div className="mt-3 flex relative before:absolute before:content-[''] before:w-full before:h-0.5 before:bg-gray-200 before:bottom-0">
                    <button className="px-8 py-3 text-gray-600  hover:text-black hover:relative hover:after:absolute hover:after:content-[''] hover:after:w-full hover:after:h-0.5 hover:after:bg-black hover:after:bottom-0 hover:after:left-0">
                        <span className="text-xl ">Video</span>
                    </button>
                    <button className="flex items-center px-8 py-3 text-gray-600  hover:text-black hover:relative hover:after:absolute hover:after:content-[''] hover:after:w-full hover:after:h-0.5 hover:after:bg-black hover:after:bottom-0 hover:after:left-0 ">
                        <PiLockKeyFill fontSize="20px" height="28px" className="mt-1 mr-1" />
                        <span className="text-xl  ">Yêu thích</span>
                    </button>
                    <button className="flex items-center px-8 py-3 text-gray-600  hover:text-black hover:relative hover:after:absolute hover:after:content-[''] hover:after:w-full hover:after:h-0.5 hover:after:bg-black hover:after:bottom-0 hover:after:left-0">
                        <PiLockKeyFill fontSize="20px" height="28px" className="mt-1 mr-1" />
                        <span className="text-xl ">Đã thích</span>
                    </button>
                </div>
                <div className="flex flex-wrap">
                    {videoOfMe.map((video) => {
                        return <ProfileVideo fakeVideo={video} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default DetailUser;
