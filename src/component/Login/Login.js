import { useState } from 'react';
import Button from '../Layout/component/Button/Button';
import { IoMdClose } from 'react-icons/io';
import { FaEyeSlash } from 'react-icons/fa';

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

                {handleLogin ? (
                    <div>
                        <div className="px-5">
                            <p className="text-[-18] font-bold">Email</p>
                            <input
                                type="text"
                                placeholder="email"
                                className="w-full px-3 leading-10 border border-gray-300 outline-none my-3 focus:border-black"
                            />
                            <p className="text-[-18] font-bold">Password</p>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="password"
                                    className="w-full px-3 pr-5 leading-10 border border-gray-300 outline-none my-3 focus:border-black"
                                />
                                <div className="absolute top-4 right-0 px-2 py-2">
                                    <FaEyeSlash />
                                </div>
                            </div>
                            <p className="text-[-18] font-bold">Confirm Password</p>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="confirm password"
                                    className="w-full px-3 pr-5 leading-10 border border-gray-300 outline-none my-3 focus:border-black"
                                />
                                <div className="absolute top-4 right-0 px-2 py-2">
                                    <FaEyeSlash />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-3 pb-9">
                            <Button noOutline>Đăng nhập</Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="px-5">
                            <p className="text-[-18] font-bold">Họ và tên</p>
                            <input
                                type="text"
                                placeholder="họ và tên"
                                className="w-full px-3 leading-10 border border-gray-300 outline-none my-3 focus:border-black"
                            />
                            <p className="text-[-18] font-bold">Email</p>
                            <input
                                type="text"
                                placeholder="email"
                                className="w-full px-3 leading-10 border border-gray-300 outline-none my-3 focus:border-black "
                            />
                            <p className="text-[-18] font-bold">Password</p>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="password"
                                    className="w-full px-3 pr-5 leading-10 border border-gray-300 outline-none my-3 focus:border-black"
                                />
                                <div className="absolute top-4 right-0 px-2 py-2">
                                    <FaEyeSlash />
                                </div>
                            </div>
                            <p className="text-[-18] font-bold">Confirm Password</p>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="confirm password"
                                    className="w-full px-3 pr-5 leading-10 border border-gray-300 outline-none my-3 focus:border-black"
                                />
                                <div className="absolute top-4 right-0 px-2 py-2">
                                    <FaEyeSlash />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-3 pb-9">
                            <Button noOutline>Đăng ký</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;
