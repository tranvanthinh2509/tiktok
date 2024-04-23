import MainVideo from '../../component/MainVideo/MainVideo';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService';
import * as VideoService from '../../services/VideoService';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../../component/LoadingComponent/Loading';
import NoLogin from '../../component/NoLogin/NoLogin';
function Following() {
    const user = useSelector((state) => state.user);
    const [following, setFollowing] = useState(user.id);
    const [userFollowing, setUserFollowing] = useState([]);
    const [loading, setLoading] = useState(true);
    const videoFollowing = [];
    const [arrFollowing, setArrFollowing] = useState([]);
    const mutation = useMutationHooks(async (data) => {
        const { id } = data;
        const res = await UserService.followingUser(id);
        setUserFollowing(res.data);
        if (userFollowing) {
            setLoading(false);
        }
    });
    const mutationFolowingVideo = useMutationHooks(async (data) => {
        const { id } = data;
        const res = await VideoService.getFollowingVideo(id);
        videoFollowing.push(...res.data);
        setArrFollowing(videoFollowing);
        setLoading(false);
    });

    useEffect(() => {
        if (user.id) {
            mutation.mutate({ id: user.id });
        }
        setArrFollowing(arrFollowing);
    }, [user]);

    useEffect(() => {
        if (user.id) {
            userFollowing.map((userfollowing) => mutationFolowingVideo.mutate({ id: userfollowing._id }));
        }
    }, [userFollowing, user]);
    return (
        <div>
            {user.id ? (
                <Loading isLoading={loading}>
                    <div className="w-full h-screen flex flex-col items-center mt-16">
                        {arrFollowing?.map((following) => {
                            return <MainVideo fakeUser={following} />;
                        })}
                    </div>
                </Loading>
            ) : (
                <NoLogin />
            )}
        </div>
    );
}
export default Following;
