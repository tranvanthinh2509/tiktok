import MainVideo from '../../component/MainVideo/MainVideo';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService';
import * as VideoService from '../../services/VideoService';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../../component/LoadingComponent/Loading';
import NoLogin from '../../component/NoLogin/NoLogin';
import NewLoading from '../../component/NewLoading';
function Following() {
    const user = useSelector((state) => state.user);
    const [userFollowing, setUserFollowing] = useState();
    const [loading, setLoading] = useState(true);
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
        const { userFollowing } = data;
        const res = await VideoService.getFollowingVideo({ userFollowing });
        setLoading(false);
        setArrFollowing(res.data);
    });
    useEffect(() => {
        if (user.id) {
            mutation.mutate({ id: user.id });
        }
    }, [user]);

    useEffect(() => {
        if (userFollowing) {
            mutationFolowingVideo.mutate({ userFollowing });
        }
    }, [userFollowing, user]);
    const { isPending } = mutationFolowingVideo;
    return (
        <div>
            {user.id ? (
                <div className="w-full h-screen flex flex-col items-center mt-16">
                    {isPending && <NewLoading isLoading={isPending} />}

                    {arrFollowing?.map((following) => {
                        return <MainVideo fakeUser={following} />;
                    })}
                </div>
            ) : (
                <NoLogin />
            )}
        </div>
    );
}
export default Following;
