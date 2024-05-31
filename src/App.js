import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout, HeaderOnly } from './component/Layout';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { isJsonString } from './utils';
import { jwtDecode } from 'jwt-decode';
import * as UserService from './services/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './redux/slides/userSlide';
import Loading from './component/LoadingComponent/Loading';
function App() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const { storageData, decoded } = handleDecoded();

        if (decoded?.id) {
            handleGetDetailUser(decoded?.id, storageData);
        }
    }, []);

    const handleGetDetailUser = async (id, token) => {
        console.log('token ', token);
        try {
            const res = await UserService.getDetailUser(id, token);
            dispatch(updateUser({ ...res?.data, access_token: token }));
        } catch {
            localStorage.removeItem('access_token');
        }
    };

    const handleDecoded = () => {
        let storageData = localStorage.getItem('access_token');
        let decoded;
        if (storageData && isJsonString(storageData)) {
            storageData = JSON.parse(storageData);
            decoded = jwtDecode(storageData);
        }
        return { decoded, storageData };
    };

    UserService.axiosJWT.interceptors.request.use(
        async function (config) {
            const currentTime = new Date();
            const { storageData, decoded } = handleDecoded();
            if (decoded?.exp < currentTime.getTime() / 1000) {
                const data = await UserService.refreshToken();
                console.log('data ', data);
                config.headers['token'] = `Bearer ${data?.access_token}`;
            }
            return config;
        },
        function (error) {
            // Do something with request error
            return Promise.reject(error);
        },
    );

    return (
        <div>
            <Loading isLoading={isLoading}>
                <Router>
                    <div className="App">
                        <Routes>
                            {publicRoutes.map((route, index) => {
                                const Page = route.component;
                                let Layout = DefaultLayout;
                                const isCheckAuth = !route.isPrivate || user.isAdmin;
                                if (route.layout) {
                                    Layout = HeaderOnly;
                                } else if (route.layout === null) {
                                    Layout = Fragment;
                                }
                                return (
                                    <Route
                                        key={index}
                                        path={{ isCheckAuth } && route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Routes>
                    </div>
                </Router>
            </Loading>
        </div>
    );
}

export default App;
