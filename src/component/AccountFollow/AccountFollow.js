import { useSelector } from 'react-redux';
import AccountFollowItem from './AccountFollowItem';
import { useEffect, useState } from 'react';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService';
function AccountFollow() {
    const user = useSelector((state) => state.user);
    const [userFollowing, setUserFollowing] = useState([]);
    const mutation = useMutationHooks(async (data) => {
        const { id } = data;
        const res = await UserService.followingUser(id);
        setUserFollowing(res.data);
    });
    useEffect(() => {
        if (user.id) {
            mutation.mutate({ id: user.id });
        }
    }, [user]);
    console.log('oke', userFollowing);
    return (
        <div>
            <h1 className="text-[-16] font-semibold text-gray-500 mb-1">Các tài khoảng đang follow</h1>

            {userFollowing.length === 0 ? (
                <p className="text-[-14] mt-1 font-semibold text-gray-400">
                    Những tài khoản bạn đang following sẽ xuất hiện tại dây
                </p>
            ) : (
                <div>
                    {userFollowing.map((userFollow) => {
                        return <AccountFollowItem fakeUser={userFollow} />;
                    })}
                </div>
            )}
        </div>
    );
}

export default AccountFollow;
