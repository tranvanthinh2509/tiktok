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
    const infoPeding = {
        _id: '6654448dddd35b2387a524ed',
        description: 'Gia đình nhỏ hạnh phúc to ❤️',
        video: 'http://res.cloudinary.com/dzcgxdbbw/video/upload/v1716798602/ddmgbgtnhk9yurtssrnx.mp4',
        userId: {
            _id: '66543fdfddd35b2387a5248d',
            name: 'Thịnh Trần',
            followers: [
                '6654455cddd35b2387a52501',
                '665446b2ddd35b2387a52578',
                '665447bfddd35b2387a525b3',
                '6666a3578a381088cf6d6b0f',
            ],
            followings: [],
            avatar: 'http://res.cloudinary.com/dzcgxdbbw/image/upload/v1716797586/iugdsp15xuufh97ulhkb.jpg',
            nickName: 'Thịnh Trần',
        },
        tag: '#ngontinh',
        imageBg: '',
        liked: ['6654455cddd35b2387a52501'],
        comment: ['6654467bddd35b2387a52560', '66668744a93164724c3fc8cd'],
        saved: [],
        shared: [],
        createdAt: '2024-05-27T08:30:05.051Z',
        updatedAt: '2024-06-13T16:32:39.647Z',
        __v: 0,
    };

    const fetchVideoAll = async () => {
        const res = await VideoService.getAllVideo();

        setLoading(false);
        return res;
    };

    const { isPending, data: videos } = useQuery({ queryKey: ['videos'], queryFn: fetchVideoAll });
    return (
        <div>
            {/* {isPending && <NewLoading isLoading={isPending} />} */}
            <div className="w-full min-h-screen flex flex-col items-center mt-16">
                {videos?.data ? (
                    videos?.data?.map((video, index) => {
                        return <MainVideo fakeUser={video} />;
                    })
                ) : (
                    <MainVideo fakeUser={infoPeding} isPending={isPending} />
                )}
            </div>
        </div>
    );
}

export default Home;
