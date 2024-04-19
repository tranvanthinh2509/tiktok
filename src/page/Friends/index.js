import UserNotFollow from '../../component/UserNotFollow/UserNotFollow';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService';
import * as VideoService from '../../services/VideoService';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NoLogin from '../../component/NoLogin/NoLogin';
import Loading from '../../component/LoadingComponent/Loading';
function Friends() {
    const user = useSelector((state) => state.user);
    const [friends, setFriends] = useState([]);
    const arrVideo = [];
    const [videoFriend, setVideoFriend] = useState([]);
    const [loading, setLoading] = useState(true);
    const mutation = useMutationHooks(async (data) => {
        const { id } = data;
        const res = await UserService.NotFollowingUser(id);
        setFriends(res.data);
    });

    const mutationVideoBG = useMutationHooks(async (data) => {
        const { id } = data;
        const res = await VideoService.getARecentVideo(id);

        if (res.data !== null) {
            arrVideo.push(res.data);
            setVideoFriend(arrVideo);
            setLoading(false);
        } else {
            setLoading(false);
        }
    });

    useEffect(() => {
        if (user) {
            mutation.mutate({ id: user.id });
        }
    }, [user]);

    useEffect(() => {
        for (let i = 0; i < friends.length; i++) {
            mutationVideoBG.mutate({ id: friends[i]._id });
        }
    }, [friends, user]);

    return (
        <div>
            {user.id ? (
                <div className="w-full flex justify-center pt-5 mt-16">
                    <Loading isLoading={loading}>
                        <div className="grid grid-cols-3 gap-4">
                            {videoFriend.map((video) => {
                                return <UserNotFollow fakeVideo={video} />;
                            })}
                        </div>
                    </Loading>
                </div>
            ) : (
                <NoLogin />
            )}
        </div>
    );
}

export default Friends;
