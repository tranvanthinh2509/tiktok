import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import SignIn from './SignIn';
import SignUp from './SignUp';
function Login({ onClick }) {
    const [handleLogin, setHandleLogin] = useState(true);

    return (
        <div className=" fixed z-30 w-full h-full bg-black bg-opacity-45 ">
            <div className="w-[-500] max-h-full bg-white mx-auto mt-20 rounded-lg">
                <div className="flex relative py-3">
                    <button
                        className={`text-2xl font-bold py-3 text-center cursor-pointer px-5 ${
                            handleLogin ? 'text-black text-xl' : 'text-red-500'
                        }`}
                        onClick={() => {
                            setHandleLogin(!handleLogin);
                        }}
                    >
                        Đăng ký
                    </button>
                    <button
                        className={`text-2xl font-bold py-3 text-center relative cursor-pointer px-5 ${
                            handleLogin ? 'text-red-500' : 'text-black text-xl'
                        }`}
                        onClick={() => {
                            setHandleLogin(!handleLogin);
                        }}
                    >
                        Đăng nhập
                    </button>
                    <div
                        className="absolute right-5 top-4 px-1 py-1 bg-gray-100 rounded-[-50%] hover:cursor-pointer "
                        onClick={onClick}
                    >
                        <IoMdClose fontSize="23px" />
                    </div>
                </div>

                {handleLogin ? <SignIn /> : <SignUp />}
            </div>
        </div>
    );
}

export default Login;
