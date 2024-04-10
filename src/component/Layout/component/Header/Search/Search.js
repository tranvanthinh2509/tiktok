import { useEffect, useRef, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { Wrapper } from '../../../../Popper';
import AccountItem from '../../../../AccountItem/AccountItem';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { BiLoaderAlt } from 'react-icons/bi';
import * as UserService from '../../../../../services/UserService';
function Search() {
    let [searchResult, setSearchResult] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);
    let res = [];
    useEffect(() => {
        if (!searchInput.trim()) {
            setSearchResult([]);

            return;
        }
        setLoading(true);

        // fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(searchInput)}&type=more`)
        //     .then((res) => res.json())
        //     .then((res) => {
        //         setSearchResult(res.data);

        //         setLoading(false);
        //     });

        fetch(`http://localhost:3001/api/user/search?filter=name&filter=${encodeURIComponent(searchInput)}`)
            .then((res) => res.json())
            .then((res) => {
                setSearchResult(res.data);
                setLoading(false);
            });
    }, [searchInput]);

    const inputRef = useRef();
    return (
        <HeadlessTippy
            visible={showResult && searchResult.length > 0}
            render={(atr) => (
                <div className="w-[-500] shadow-[-wrapper] rounded-[-8]" tabIndex="-1" {...atr}>
                    <Wrapper>
                        <p className="text-sm font-semibold px-3 py-1 text-gray-400">Account</p>
                        {searchResult.map((result) => {
                            return <AccountItem data={result} />;
                        })}
                    </Wrapper>
                </div>
            )}
        >
            <div className="find relative flex items-center bg-[-input]  w-[-500]  rounded-[-92] border hover:border hover:border-gray-400 focus-within:border-gray-400 hover:cursor-pointer">
                <input
                    ref={inputRef}
                    value={searchInput}
                    onChange={(e) => {
                        setSearchInput(e.target.value);
                    }}
                    onFocus={() => {
                        setShowResult(true);
                    }}
                    type="text"
                    placeholder="Tìm kiếm"
                    className="search px-4 py-2.5  flex-1 bg-[-input] placeholder:text-gray-600 placeholder:text-lg focus:outline-none rounded-[-92]"
                />
                {loading && (
                    <button className="absolute bottom-3.5 right-16 animate-spin">
                        <BiLoaderAlt fontSize="16px" color="rgba(22, 24, 35, 34)" />
                    </button>
                )}

                {!!searchInput && !loading && (
                    <button
                        className="absolute bottom-3.5 right-16 "
                        onClick={() => {
                            setSearchInput('');
                            inputRef.current.focus();
                        }}
                    >
                        <IoCloseCircleSharp fontSize="16px" color="rgba(22, 24, 35, .34)" />
                    </button>
                )}

                <span className="h-7 w-[-1] bg-gray-400 opacity-65 ml-4"></span>
                <div className="px-4 py-3 hover:opacity-65">
                    <FaMagnifyingGlass color="rgba(22, 24, 35, .34)" fontSize="19px" />
                </div>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
