import { useQuery } from '@tanstack/react-query';
import MainVideo from '../../component/MainVideo/MainVideo';
import * as VideoService from '../../services/VideoService';
import { data } from 'jquery';

function Home() {
    const fakeUser = {
        id: 2,
        first_name: 'Đào Lê',
        last_name: 'Phương Hoa',
        full_name: 'Đào Lê Phương Hoa',
        nickname: 'hoaahanassii',
        avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/2/627394cb56d66.jpg',
        bio: '✨ 1998 ✨\nVietnam 🇻🇳\nĐỪNG LẤY VIDEO CỦA TÔI ĐI SO SÁNH NỮA. XIN HÃY TÔN TRỌNG !',
        tick: true,
        followings_count: 1,
        followers_count: 77,
        likes_count: 1000,
        website_url: 'https://fullstack.edu.vn/',
        facebook_url: '',
        youtube_url: '',
        twitter_url: '',
        instagram_url: '',
        created_at: '2022-05-05 23:10:05',
        updated_at: '2022-05-05 23:11:39',
    };

    const fetchVideoAll = async () => {
        const res = await VideoService.getAllVideo();
        return res;
    };
    const { isLoading, data: videos } = useQuery({ queryKey: 'videos', queryFn: fetchVideoAll });
    console.log('data ', videos);
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
