import UserNotFollow from '../../component/UserNotFollow/UserNotFollow';
import MainVideo from '../../component/MainVideo/MainVideo';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService';
import * as VideoService from '../../services/VideoService';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../../component/LoadingComponent/Loading';

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
    });
    const mutationFolowingVideo = useMutationHooks(async (data) => {
        const { id } = data;
        const res = await VideoService.getFollowingVideo(id);
        videoFollowing.push(...res.data);
        setArrFollowing(videoFollowing);
    });

    useEffect(() => {
        if (user) {
            mutation.mutate({ id: user.id });
        }
        setArrFollowing(arrFollowing);
    }, [user]);

    useEffect(() => {
        for (let i = 0; i < userFollowing.length; i++) {
            mutationFolowingVideo.mutate({ id: userFollowing[i]._id });
        }
    }, [userFollowing, user]);

    return (
        <div>
            {following ? (
                <div className="w-full flex flex-col items-center mt-16">
                    {arrFollowing?.map((following) => {
                        return <MainVideo fakeUser={following} />;
                    })}
                </div>
            ) : (
                <div className="w-full flex justify-center pt-5 mt-16">
                    <div className="grid grid-cols-3 gap-4">
                        <UserNotFollow />
                        <UserNotFollow />
                    </div>
                </div>
            )}
        </div>
    );
}
export default Following;
