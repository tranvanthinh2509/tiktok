import { useMutationHooks } from '../../hooks/useMutationHook';
import * as VideoService from '../../services/VideoService';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Panigation from '../../component/Panigation/Panigation';
import Loading from '../../component/LoadingComponent/Loading';
import ManagerItemVideo from '../../component/ManagerItemVideo/ManagerItemVideo';
function ManagerVideo() {
    const [data, setData] = useState([]);
    const [checkRender, setCheckRender] = useState(true);
    const [limit, setLimit] = useState(6);
    const [page, setPage] = useState(1);
    const [totalVideo, setTotalVideo] = useState(1);
    const [find, setFind] = useState('');
    const user = useSelector((state) => state.user);
    const access_token = user.access_token;
    const mutationAllVideo = useMutationHooks(async ({ limit, page, title }) => {
        const res = await VideoService.getAllVideo(limit, page - 1, title);
        setData(res.data);
        setTotalVideo(res.total);
    });

    const handleOnChangeFind = (e) => {
        setFind(e.target.value);
    };

    useEffect(() => {
        mutationAllVideo.mutate({ limit, page, title: find });
    }, [user, page, totalVideo, find, checkRender]);
    const { isPending, isSuccess, isError } = mutationAllVideo;
    // console.log('dataVideo ', data);
    return (
        <div className="mt-16 px-5 py-5">
            <div className="w-full h-full">
                <Loading isLoading={isPending}>
                    <h1 className="text-2xl font-semibold text-[text-primary]">Manager Video</h1>

                    <div className="flex my-4">
                        <div className="px-5 py-2 bg-[-primary] text-white font-semibold rounded-lg">Tìm kiếm</div>
                        <input
                            value={find}
                            placeholder="Tìm kiếm bằng mô tả hoặc hagtag"
                            className="ml-3 w-96 px-3 py-2 outline-none border border-gray-400 rounded-lg"
                            onChange={handleOnChangeFind}
                        />
                    </div>

                    <div className=" mt-5 ">
                        <ul className="flex w-full">
                            <li className="px-3 py-3 w-32 font-semibold border-r-2 bg-[-primary]  text-white">
                                Avatar
                            </li>
                            <li className="px-3 py-3 w-64 font-semibold border-r-2 bg-[-primary]  text-white">
                                NickName
                            </li>
                            <li className="px-3 py-3 w-64 font-semibold border-r-2 bg-[-primary]  text-white">Name</li>
                            <li className="px-3 py-3 w-2/5 font-semibold border-r-2 bg-[-primary]  text-white">
                                Description
                            </li>

                            <li className="px-3 py-3 w-64 font-semibold border-r-2 bg-[-primary]  text-white">Video</li>
                            <li className="px-3 py-3 w-32 font-semibold border-r-2 bg-[-primary]  text-white">
                                Action
                            </li>
                        </ul>

                        {data.length !== 0 &&
                            data.map((item) => {
                                return (
                                    <ManagerItemVideo
                                        avatar={item.userId.avatar}
                                        nickName={item.userId.nickName}
                                        name={item.userId.name}
                                        description={item.description}
                                        video={item.video}
                                        id={item._id}
                                        handleCheckRender={() => setCheckRender(!checkRender)}
                                    ></ManagerItemVideo>
                                );
                            })}

                        <div className="flex justify-center mt-10">
                            <Panigation total={totalVideo} sizePage={limit} page={page} setPage={setPage}></Panigation>
                        </div>
                    </div>
                </Loading>
            </div>
        </div>
    );
}

export default ManagerVideo;
