import Header from '../component/Header';

function HeaderOnly({ children }) {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}

export default HeaderOnly;
