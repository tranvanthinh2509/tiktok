import Button from '../../component/Layout/component/Button/Button';
import ExplorerVideo from '../../component/ExplorerVideo/ExplorerVideo';

function Explorer() {
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

    return (
        <div className="mt-16">
            <div id="navbar" className="ml-12 fixed z-10 top-16 pt-6 pb-4 bg-white w-full">
                <div className="flex">
                    <Button explorer> Ca hát & Khiêu vũ</Button>
                </div>
            </div>
            <div>
                <div className="w-full flex pt-24 px-12 pb-8">
                    <div className="grid grid-cols-4 gap-4">
                        <ExplorerVideo fakeUser={fakeUser} />
                        <ExplorerVideo fakeUser={fakeUser} />
                        <ExplorerVideo fakeUser={fakeUser} />
                        <ExplorerVideo fakeUser={fakeUser} />
                        <ExplorerVideo fakeUser={fakeUser} />
                        <ExplorerVideo fakeUser={fakeUser} />
                        <ExplorerVideo fakeUser={fakeUser} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Explorer;
