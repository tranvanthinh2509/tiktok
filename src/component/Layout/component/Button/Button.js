import { Link } from 'react-router-dom';
import classNames from 'classnames';
function Button({
    to,
    href,
    children,
    onClick,
    text,
    primary = false,
    outline,
    leftIcon,
    rightIcon,
    icon,
    ...passProp
}) {
    let Comp = 'button';

    const props = {
        onClick,
        ...passProp,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    let hoverButton;

    if (text) {
        hoverButton = classNames('hover:bg-[-button-text] mr-2');
    }
    if (primary) {
        hoverButton = classNames('bg-[-button-primary] border-none text-white hover:opacity-90 mr-2');
    }
    if (outline) {
        hoverButton = classNames('border-red-500 text-red-500 mr-0');
    }

    let button = classNames(
        'button-comp min-w-[w-100] rounded border border-solid border-[-gray-button] h-9 flex items-center justify-center px-2',
        hoverButton,
    );
    if (icon) {
        button = classNames('ml-3 px-1', hoverButton);
    }
    return (
        <Comp className={button} {...props}>
            {leftIcon && <span>{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
