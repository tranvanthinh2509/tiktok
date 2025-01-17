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
    const infoPeding = {
        _id: '6654448dddd35b2387a524ed',
        description: 'Gia đình nhỏ hạnh phúc to ❤️',
        video: 'http://res.cloudinary.com/dzcgxdbbw/video/upload/v1716798602/ddmgbgtnhk9yurtssrnx.mp4',
        userId: {
            _id: '66543fdfddd35b2387a5248d',
            name: 'Thịnh Trần',
            followers: [
                '6654455cddd35b2387a52501',
                '665446b2ddd35b2387a52578',
                '665447bfddd35b2387a525b3',
                '6666a3578a381088cf6d6b0f',
            ],
            followings: [],
            avatar: 'http://res.cloudinary.com/dzcgxdbbw/image/upload/v1716797586/iugdsp15xuufh97ulhkb.jpg',
            nickName: 'Thịnh Trần',
        },
        tag: '#ngontinh',
        imageBg: '',
        liked: ['6654455cddd35b2387a52501'],
        comment: ['6654467bddd35b2387a52560', '66668744a93164724c3fc8cd'],
        saved: [],
        shared: [],
        createdAt: '2024-05-27T08:30:05.051Z',
        updatedAt: '2024-06-13T16:32:39.647Z',
        __v: 0,
    };
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
                    {isPending && <MainVideo fakeUser={infoPeding} isPending={isPending} />}

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
