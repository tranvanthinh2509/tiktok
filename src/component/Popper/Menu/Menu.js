import Tippy from '@tippyjs/react/headless';
import { Wrapper } from '../../Popper';
import MenuHeader from './MenuHeader';

import MenuItem from './MenuItem';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Menu({ children, items = [] }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    console.log('item e', items);
    const navigate = useNavigate();
    const RenderItem = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        }
                        if (item.separate) {
                            item.separate();
                        }
                        if (item?.to) {
                            navigate(item?.to);
                        }
                    }}
                />
            );
        });
    };
    return (
        <Tippy
            interactive
            delay={[0, 500]}
            placement="bottom-end"
            render={(atr) => (
                <div className="m-w-65 py-2 bg-white shadow-[-wrapper] rounded-[-8] " tabIndex="-1" {...atr}>
                    <Wrapper>
                        {history.length > 1 && (
                            <MenuHeader
                                title="Language"
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, history.length - 1));
                                }}
                            />
                        )}
                        {RenderItem()}
                    </Wrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
