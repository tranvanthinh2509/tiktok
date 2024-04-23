import { useQuery } from '@tanstack/react-query';
import MainVideo from '../../component/MainVideo/MainVideo';
import * as VideoService from '../../services/VideoService';
import { data } from 'jquery';
import Loading from '../../component/LoadingComponent/Loading';
import Button from '../../component/Layout/component/Button/Button';
import { useState } from 'react';

function Home() {
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(3);
    const fetchVideoAll = async (context) => {
        const limit = context?.queryKey && context?.queryKey[1];
        const res = await VideoService.getAllVideo(limit);
        setLoading(false);
        return res;
    };
    const { isPending, data: videos } = useQuery({ queryKey: ['videos', limit], queryFn: fetchVideoAll });
    return (
        <div>
            <Loading isLoading={isPending}>
                <div className="w-full h-full flex flex-col items-center mt-16">
                    {videos?.data?.map((video) => {
                        return <MainVideo fakeUser={video} />;
                    })}
                    <Button outline big onClick={() => setLimit((pre) => pre + 2)}>
                        More
                    </Button>
                </div>
            </Loading>
        </div>
    );
}

export default Home;
