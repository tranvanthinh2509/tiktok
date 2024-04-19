import { useQuery } from '@tanstack/react-query';
import MainVideo from '../../component/MainVideo/MainVideo';
import * as VideoService from '../../services/VideoService';
import { data } from 'jquery';
import Loading from '../../component/LoadingComponent/Loading';
import { useState } from 'react';

function Home() {
    const [loading, setLoading] = useState(true);
    const fetchVideoAll = async () => {
        const res = await VideoService.getAllVideo();
        setLoading(false);
        return res;
    };
    const { isLoading, data: videos } = useQuery({ queryKey: 'videos', queryFn: fetchVideoAll });
    return (
        <div>
            <div className="w-full h-screen flex flex-col items-center mt-16 ">
                <Loading isLoading={loading}>
                    {videos?.data?.map((video) => {
                        return <MainVideo fakeUser={video} />;
                    })}
                </Loading>
            </div>
        </div>
    );
}

export default Home;
