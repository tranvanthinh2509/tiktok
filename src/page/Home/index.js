import { useQuery } from '@tanstack/react-query';
import MainVideo from '../../component/MainVideo/MainVideo';
import * as VideoService from '../../services/VideoService';
import { data } from 'jquery';

function Home() {
    const fetchVideoAll = async () => {
        const res = await VideoService.getAllVideo();
        return res;
    };
    const { isLoading, data: videos } = useQuery({ queryKey: 'videos', queryFn: fetchVideoAll });
    return (
        <div>
            <div className="w-full flex flex-col items-center mt-16 ">
                {videos?.data?.map((video) => {
                    return <MainVideo fakeUser={video} />;
                })}
            </div>
        </div>
    );
}

export default Home;
