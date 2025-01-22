import UserNotFollow from '../../component/UserNotFollow/UserNotFollow';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService';
import * as VideoService from '../../services/VideoService';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NoLogin from '../../component/NoLogin/NoLogin';
import Loading from '../../component/LoadingComponent/Loading';
import NewLoading from '../../component/NewLoading';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaCheckCircle } from 'react-icons/fa';
function Friends() {
    const user = useSelector((state) => state.user);
    let oke = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [friends, setFriends] = useState();
    const arrVideo = [];
    const [videoFriend, setVideoFriend] = useState([]);
    const [loading, setLoading] = useState(true);
    const mutation = useMutationHooks(async (data) => {
        const { id } = data;
        const res = await UserService.NotFollowingUser(id);
        setFriends(res.data);
    });

    const mutationVideoBG = useMutationHooks(async (data) => {
        const { friends } = data;
        const res = await VideoService.getARecentVideo({ friends });
        setLoading(false);
        setVideoFriend(res.data);
    });

    useEffect(() => {
        if (user.id) {
            mutation.mutate({ id: user.id });
        }
    }, [user]);

    useEffect(() => {
        if (friends) {
            mutationVideoBG.mutate({ friends });
        }
    }, [friends, user]);

    return (
        <div>
            {user.id ? (
                <div className="w-full h-screen flex justify-center pt-5 mt-16">
                    {/* {loading && <NewLoading isLoading={loading} />} */}

                    <div className="grid grid-cols-3 gap-3 h-0">
                        {loading &&
                            oke.map((item, index) => {
                                return (
                                    <div className="w-[-226] h-[-302] relative ">
                                        <Skeleton width="226px" height="302px" count={1} />
                                        <div className="absolute left-10 right-10 bottom-10 flex flex-col justify-center items-center  text-center mb-2">
                                            <Skeleton width="48px" height="48px" count={1} />
                                            <Skeleton width="80px" height="18px" count={1} />
                                            <Skeleton width="60px" height="18px" count={1} />
                                            {/* <Button noOutline>Follow</Button> */}
                                        </div>
                                    </div>
                                );
                            })}

                        {videoFriend.map((video) => {
                            return <UserNotFollow fakeVideo={video} />;
                        })}
                    </div>
                </div>
            ) : (
                <NoLogin />
            )}
        </div>
    );
}

export default Friends;
