import { useNavigate } from 'react-router-dom';
import Image from '../Image/Image';
import { Wrapper } from '../Popper';
import AccountItemInfo from '../AccountItemInfo/AccountItemInfo';
import HeadlessTippy from '@tippyjs/react/headless';

function AccountFollowItem({ fakeUser }) {
    const navigate = useNavigate();

    const handleDetailUser = (id) => {
        navigate(`/user/${id}`);
    };

    return (
        <div
            className="flex items-center w-full py-2 hover:bg-gray-100 cursor-pointer "
            onClick={() => {
                handleDetailUser(fakeUser._id);
            }}
        >
            <Image alt="oke" src={fakeUser.avatar} className="w-8 h-8 object-cover rounded-[-50%] mr-2" />
            <div>
                <h1 className="text-[-16] font-bold leading-5">{fakeUser.nickName || fakeUser.name}</h1>
                <p className="text-xs font-semibold">{fakeUser.name}</p>
            </div>
        </div>
    );
}

export default AccountFollowItem;
