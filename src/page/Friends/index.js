import UserNotFollow from '../../component/UserNotFollow/UserNotFollow';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService';
import * as VideoService from '../../services/VideoService';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
function Friends() {
    const user = useSelector((state) => state.user);
    const [friends, setFriends] = useState([]);
    const arrVideo = [];
    const [videoFriend, setVideoFriend] = useState([]);
    const mutation = useMutationHooks(async (data) => {
        const { id } = data;
        const res = await UserService.NotFollowingUser(id);
        setFriends(res.data);
    });

    const mutationVideoBG = useMutationHooks(async (data) => {
        const { id } = data;
        const res = await VideoService.getARecentVideo(id);
        arrVideo.push(res.data);
        setVideoFriend(arrVideo);
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
        <div className="w-full flex justify-center pt-5 mt-16">
            <div className="grid grid-cols-3 gap-4">
                {videoFriend.map((video) => {
                    return <UserNotFollow fakeVideo={video} />;
                })}
            </div>
        </div>
    );
}

export default Friends;
