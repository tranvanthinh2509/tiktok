import { IoIosArrowBack } from 'react-icons/io';

function MenuHeader({ title, onBack }) {
    return (
        <div className="relative h-12 w-52">
            <button className="h-full " onClick={onBack}>
                <IoIosArrowBack className="w-5 h-5 ml-7" />
            </button>
            <p className="absolute top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 text-[-18] font-semibold">
                {title}
            </p>
        </div>
    );
}

export default MenuHeader;
