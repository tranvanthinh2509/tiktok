import Image from '../Image/Image';

function AccountFollowItem({ fakeUser }) {
    return (
        <div className="flex items-center w-full py-2 hover:bg-gray-100 cursor-pointer ">
            <Image alt="oke" src={fakeUser.avatar} className="w-8 h-8 object-cover rounded-[-50%] mr-2" />
            <div>
                <h1 className="text-[-16] font-bold leading-5">{fakeUser.nickName}</h1>
                <p className="text-xs font-semibold">{fakeUser.name}</p>
            </div>
        </div>
    );
}

export default AccountFollowItem;
