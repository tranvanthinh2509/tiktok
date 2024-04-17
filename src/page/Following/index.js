import UserNotFollow from '../../component/UserNotFollow/UserNotFollow';
import MainVideo from '../../component/MainVideo/MainVideo';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService';
import * as VideoService from '../../services/VideoService';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { get } from 'jquery';

function Following() {
    const following = true;
    const user = useSelector((state) => state.user);
    const [userFollowing, setUserFollowing] = useState([]);

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
    }, [userFollowing]);
    // const fakeUser = {
    //     id: 2,
    //     first_name: 'Đào Lê',
    //     last_name: 'Phương Hoa',
    //     full_name: 'Đào Lê Phương Hoa',
    //     nickname: 'hoaahanassii',
    //     avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/2/627394cb56d66.jpg',
    //     bio: '✨ 1998 ✨\nVietnam 🇻🇳\nĐỪNG LẤY VIDEO CỦA TÔI ĐI SO SÁNH NỮA. XIN HÃY TÔN TRỌNG !',
    //     tick: true,
    //     followings_count: 1,
    //     followers_count: 77,
    //     likes_count: 1000,
    //     website_url: 'https://fullstack.edu.vn/',
    //     facebook_url: '',
    //     youtube_url: '',
    //     twitter_url: '',
    //     instagram_url: '',
    //     created_at: '2022-05-05 23:10:05',
    //     updated_at: '2022-05-05 23:11:39',
    // };
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
