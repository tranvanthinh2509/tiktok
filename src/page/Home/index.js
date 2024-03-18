import MainVideo from '../../component/MainVideo/MainVideo';

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
    console.log(fakeUser);

    return (
        <div>
            <div className="w-full flex flex-col items-center mt-16 ">
                <MainVideo fakeUser={fakeUser} />
                <MainVideo fakeUser={fakeUser} />
            </div>
        </div>
    );
}

export default Home;
