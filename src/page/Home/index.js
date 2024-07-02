import { useQuery } from '@tanstack/react-query';
import MainVideo from '../../component/MainVideo/MainVideo';
import * as VideoService from '../../services/VideoService';
import { data } from 'jquery';
import Loading from '../../component/LoadingComponent/Loading';
import Button from '../../component/Layout/component/Button/Button';
import { useEffect, useState } from 'react';
import { useMutationHooks } from '../../hooks/useMutationHook';

function Home() {
    const [loading, setLoading] = useState(true);
    const [allVideo, setAllVideo] = useState([]);
    const fetchVideoAll = async () => {
        const res = await VideoService.getAllVideo();

        setLoading(false);
        return res;
    };

    const { isPending, data: videos } = useQuery({ queryKey: ['videos'], queryFn: fetchVideoAll });
    console.log('123 ', videos);
    return (
        <div>
            <Loading isLoading={isPending}>
                <div className="w-full h-full flex flex-col items-center mt-16">
                    {videos?.data?.map((video) => {
                        return <MainVideo fakeUser={video} />;
                    })}
                </div>
            </Loading>
        </div>
    );
}

export default Home;
