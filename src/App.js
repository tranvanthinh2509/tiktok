import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout, HeaderOnly } from './component/Layout';
import { Fragment, useEffect } from 'react';
function App() {
    // useEffect(() => {
    //     fetchApi();
    // }, []);

    // const fetchApi = async () => {
    //     const res = axios.get(`http://localhost:3001/api/video/getAll`);
    //     console.log('res', res);
    // };

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = HeaderOnly;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
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
    );
}

export default App;
