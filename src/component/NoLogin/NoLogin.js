import { FaUserAltSlash } from 'react-icons/fa';
function NoLogin() {
    return (
        <div className="w-full flex flex-col justify-center items-center mt-80">
            <FaUserAltSlash fontSize="120px" color="rgb(254, 44, 85)" />
            <h1 className="text-2xl text-[text-primary] font-semibold mt-3">Tài khoản bạn chưa đăng nhập</h1>
        </div>
    );
}

export default NoLogin;
