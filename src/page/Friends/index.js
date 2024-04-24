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
    const [friends, setFriends] = useState();
    const arrVideo = [];
    const [videoFriend, setVideoFriend] = useState([]);
    const [loading, setLoading] = useState(true);
    const mutation = useMutationHooks(async (data) => {
        const { id } = data;
        const res = await UserService.NotFollowingUser(id);
        setFriends(res.data);
    });
    console.log('res', friends);

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
            console.log('1');
            mutationVideoBG.mutate({ friends });
        }
    }, [friends, user]);

    return (
        <div>
            {user.id ? (
                <Loading isLoading={loading}>
                    <div className="w-full h-screen flex justify-center pt-5 mt-16">
                        <div className="grid grid-cols-3 gap-3 h-0">
                            {videoFriend.map((video) => {
                                return <UserNotFollow fakeVideo={video} />;
                            })}
                        </div>
                    </div>
                </Loading>
            ) : (
                <NoLogin />
            )}
        </div>
    );
}

export default Friends;
