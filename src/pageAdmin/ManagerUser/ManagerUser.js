import { useMutationHooks } from '../../hooks/useMutationHook';
import { ManagerItemUser } from '../../component/ManagerItem/index';
import * as UserService from '../../services/UserService';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Panigation from '../../component/Panigation/Panigation';
import Loading from '../../component/LoadingComponent/Loading';
function ManagerUser() {
    const [data, setData] = useState([]);
    const [checkRender, setCheckRender] = useState(true);
    const [limit, setLimit] = useState(6);
    const [page, setPage] = useState(1);
    const [find, setFind] = useState('');
    const [totalUser, setTotalUser] = useState(1);
    const user = useSelector((state) => state.user);
    const access_token = user.access_token;
    const mutationAllUser = useMutationHooks(async ({ limit, page, title, access_token }) => {
        const res = await UserService.getAllUser(limit, page - 1, title, access_token);
        setData(res.data);
        setTotalUser(res.total);
    });

    const handleOnChangeFind = (e) => {
        setFind(e.target.value);
    };

    useEffect(() => {
        console.log('find ', find);
    }, [find]);
    useEffect(() => {
        mutationAllUser.mutate({ limit, page, title: find, access_token });
    }, [user, page, totalUser, checkRender, find]);
    const { isPending, isSuccess, isError } = mutationAllUser;
    return (
        <div className="mt-16 px-5 py-5">
            <div className="w-full h-full">
                <Loading isLoading={isPending}>
                    <h1 className="text-2xl font-semibold text-[text-primary]">Manager User</h1>

                    <div className="flex my-4">
                        <div className="px-5 py-2 bg-[-primary] text-white font-semibold rounded-lg">Tìm kiếm</div>
                        <input
                            value={find}
                            placeholder="Tìm kiếm bằng tên hoặc nickname"
                            className="ml-3 w-96 px-3 py-2 outline-none border border-gray-400 rounded-lg"
                            onChange={handleOnChangeFind}
                        />
                    </div>

                    <div className=" mt-5 ">
                        <ul className="flex w-full">
                            <li className="px-3 py-3 w-32 font-semibold border-r-2 bg-[-primary]  text-white">
                                Avatar
                            </li>
                            <li className="px-3 py-3 w-48 font-semibold border-r-2 bg-[-primary]  text-white">level</li>
                            <li className="px-3 py-3 w-2/5 font-semibold border-r-2 bg-[-primary]  text-white">
                                NickName
                            </li>
                            <li className="px-3 py-3 w-2/5 font-semibold border-r-2 bg-[-primary]  text-white">Name</li>
                            <li className="px-3 py-3 w-2/5 font-semibold border-r-2 bg-[-primary]  text-white">
                                Story
                            </li>
                            <li className="px-3 py-3 w-32 font-semibold border-r-2 bg-[-primary]  text-white">
                                Action
                            </li>
                        </ul>

                        {data.length !== 0 &&
                            data.map((item) => {
                                return (
                                    <ManagerItemUser
                                        avatar={item.avatar}
                                        nickName={item.nickName}
                                        name={item.name}
                                        story={item.story}
                                        level={item.isAdmin}
                                        id={item._id}
                                        handleCheckRender={() => setCheckRender(!checkRender)}
                                    ></ManagerItemUser>
                                );
                            })}

                        <div className="flex justify-center mt-10">
                            <Panigation total={totalUser} sizePage={limit} page={page} setPage={setPage}></Panigation>
                        </div>
                    </div>
                </Loading>
            </div>
        </div>
    );
}

export default ManagerUser;
