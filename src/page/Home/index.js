import { useQuery } from '@tanstack/react-query';
import MainVideo from '../../component/MainVideo/MainVideo';
import * as VideoService from '../../services/VideoService';
import { data } from 'jquery';
import Loading from '../../component/LoadingComponent/Loading';
import Button from '../../component/Layout/component/Button/Button';
import { useEffect, useRef, useState } from 'react';
import { useMutationHooks } from '../../hooks/useMutationHook';
import NewLoading from '../../component/NewLoading';

function Home() {
    const [loading, setLoading] = useState(true);
    const [allVideo, setAllVideo] = useState([]);
    const fetchVideoAll = async () => {
        const res = await VideoService.getAllVideo();

        setLoading(false);
        return res;
    };

    const { isPending, data: videos } = useQuery({ queryKey: ['videos'], queryFn: fetchVideoAll });
    return (
        <div>
            {isPending && <NewLoading isLoading={isPending} />}
            <div className="w-full min-h-screen flex flex-col items-center mt-16">
                {videos?.data?.map((video, index) => {
                    return <MainVideo fakeUser={video} />;
                })}
            </div>
        </div>
    );
}

export default Home;
