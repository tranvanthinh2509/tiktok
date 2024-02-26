import Header from '../component/Header';
import Sidebar from './Sidebar';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="flex ">
                <Sidebar />
                <div className="flex-1">{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
