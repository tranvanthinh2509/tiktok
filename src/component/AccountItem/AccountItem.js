import { FaCheckCircle } from 'react-icons/fa';
import Image from '../Image/Image';

function AccountItem({ data }) {
    return (
        <div className="flex items-center px-4 py-2">
            <Image src={data.avatar} alt={data.name} className="w-10 h-10 object-cover rounded-[-50%] mr-3" />
            <div>
                <h1 className="flex items-center">
                    <span className="text-[-16] font-semibold text-black">{data.nickName || data.name}</span>
                    {data.tick && <FaCheckCircle fontSize="14px" color="rgb(32, 213, 236)" className="ml-1" />}
                </h1>
                <p className="text-[-14] font-normal text-gray-500">{data.name}</p>
            </div>
        </div>
    );
}

export default AccountItem;
