import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

function ManagerLayout({ children }) {
    return (
        <div>
            <div>
                <Header></Header>
            </div>
            <div className="flex">
                <Sidebar></Sidebar>
                <div className="flex-1">{children}</div>
            </div>
        </div>
    );
}

export default ManagerLayout;
