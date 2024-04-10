import { FaCheckCircle } from 'react-icons/fa';
import Button from '../Layout/component/Button/Button';
import Image from '../Image/Image';

function AccountItemInfo({ data }) {
    return (
        <div className="px-5 py-5">
            <div className="flex justify-between">
                <Image
                    src={data?.userId?.avatar}
                    alt={data?.userId?.nickname}
                    className="w-10 h-10 object-cover rounded-[-50%] mr-3"
                />
                <Button outline>Follow</Button>
            </div>
            <div className="py-2">
                <h1 className="flex items-center">
                    <span className="text-[-18] font-bold text-black">{data?.userId?.nickName}</span>
                    {data.tick && <FaCheckCircle fontSize="14px" color="rgb(32, 213, 236)" className="ml-1" />}
                </h1>
                <p className="text-[-16] font-medium ">{data?.userId?.name}</p>
            </div>
            <div className="flex ">
                <h1 className="text-[-18] font-semibold ">{data.follower || '0'}</h1>
                <p className="text-[-18] px-2 text-gray-700">Follower</p>
                <h1 className="text-[-18] font-semibold ">{data.liked || '0'}</h1>
                <p className="text-[-18] px-2 text-gray-700">Likes</p>
            </div>
        </div>
    );
}

export default AccountItemInfo;
