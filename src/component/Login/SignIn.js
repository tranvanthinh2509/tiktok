import { useEffect, useState } from 'react';
import Button from '../Layout/component/Button/Button';
import { FaEyeSlash } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa6';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService';
import Loading from '../LoadingComponent/Loading';
import * as message from '../Message/Message';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slides/userSlide';

function SignIn() {
    const mutation = useMutationHooks((data) => UserService.loginUser(data));
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data, isPending, isSuccess, isError } = mutation;
    useEffect(() => {
        if (isSuccess) {
            // navigate('/');
            window.location = 'http://localhost:3000/';
            localStorage.setItem('access_token', JSON.stringify(data?.access_token));
            if (data?.access_token) {
                const decoded = jwtDecode(data?.access_token);
                console.log('decode ', decoded);
                if (decoded?.id) {
                    handleGetDetailUser(decoded?.id, data?.access_token);
                }
            }
        }
    }, [isSuccess]);

    const handleGetDetailUser = async (id, token) => {
        const res = await UserService.getDetailUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
    };
    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleOnChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSignIn = () => {
        mutation.mutate({
            email,
            password,
        });
    };

    return (
        <div>
            <div className="px-5">
                <p className="text-[-18] font-bold">Email</p>
                <input
                    type="email"
                    placeholder="email"
                    className="w-full px-3 leading-10 border border-gray-300 outline-none my-3 focus:border-black"
                    onChange={(e) => handleOnChangeEmail(e)}
                    value={email}
                />
                <p className="text-[-18] font-bold">Password</p>
                <div className="relative">
                    <input
                        type={isShowPassword ? 'text' : 'password'}
                        placeholder="password"
                        className="w-full px-3 pr-5 leading-10 border border-gray-300 outline-none my-3 focus:border-black"
                        onChange={(e) => handleOnChangePassword(e)}
                        value={password}
                    />
                    <div
                        className="absolute top-4 right-0 px-2 py-2"
                        onClick={() => {
                            setIsShowPassword(!isShowPassword);
                        }}
                    >
                        {isShowPassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                </div>
                {data?.status === 'ERR' && <span className="text-red-600">{data?.message}</span>}
            </div>

            <div className="flex justify-center mt-3 pb-9">
                <Loading isLoading={isPending}>
                    <Button noOutline onClick={handleSignIn} disabled={!email || !password}>
                        Đăng nhập
                    </Button>
                </Loading>
            </div>
        </div>
    );
}

export default SignIn;
