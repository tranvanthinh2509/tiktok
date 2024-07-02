import Menu from '../../../Popper/Menu/Menu';
import images from '../../../../asset/image';
import { Logout, Profile } from '../../../Icons';
import Image from '../../../Image/Image';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const User_MENU = [
        {
            icon: <Profile />,
            title: 'Xem hồ sơ',
        },
        {
            icon: <Logout />,
            title: 'Đăng xuất',
        },
    ];
    return (
        <div>
            <div className="header fixed w-full z-20 pl-5 pr-16 h-16 border-b border-b-gray flex items-center justify-between bg-white">
                <div className="flex items-center ">
                    <img
                        src={images.logo.default}
                        alt="tik-tok"
                        onClick={() => {
                            navigate('/');
                        }}
                        className="cursor-pointer"
                    />
                    <div className="ml-5">
                        <div className="px-3 bg-black text-white text-[-14] font-semibold rounded-sm text-center ">
                            Creator Center
                        </div>
                    </div>
                    <div className="ml-2">
                        <div className=" px-3 bg-[-primary] text-white text-[-14] font-semibold rounded-sm text-center ">
                            Beta
                        </div>
                    </div>
                </div>

                <div className="actor flex items-center">
                    <Menu items={User_MENU}>
                        <Image src={user.avatar} alt="son-tung" className="w-8 h-8 rounded-[-50%] object-cover ml-6 " />
                    </Menu>
                </div>
            </div>
        </div>
    );
}

export default Header;
