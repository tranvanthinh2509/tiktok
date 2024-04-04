import Home from '../page/Home';
import Following from '../page/Following';
import Upload from '../page/Upload';
import Search from '../page/Search';
import Friends from '../page/Friends';
import Explorer from '../page/Explorer';
import Profile from '../page/Profile';
import Video from '../page/Video/Video';
import SystemAdmin from '../page/SystemAdmin/SystemAdmin';
import { HeaderOnly } from '../component/Layout';

const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/following',
        component: Following,
    },
    {
        path: '/friends',
        component: Friends,
    },
    {
        path: '/explorer',
        component: Explorer,
    },
    {
        path: '/profile',
        component: Profile,
    },
    {
        path: '/profile/video',
        component: Video,
        layout: null,
    },
    {
        path: '/upload',
        component: Upload,
        layout: HeaderOnly,
    },
    {
        path: '/search',
        component: Search,
        layout: null,
    },
    {
        path: '/system/admin',
        component: SystemAdmin,
        layout: null,
        isPrivate: true,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
