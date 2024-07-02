import { Link } from 'react-router-dom';
import classNames from 'classnames';
function Button({
    to,
    href,
    children,
    onClick,
    disabled,
    text,
    primary = false,
    outline,
    noOutline,
    explorer,
    leftIcon,
    rightIcon,
    icon,
    small,
    big,
    bigbig,
    none,
    ...passProp
}) {
    let Comp = 'button';

    const props = {
        onClick,
        disabled,
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
        hoverButton = classNames('hover:text-red-500 mr-2 disabled:opacity-25 px-2');
    }
    if (primary) {
        hoverButton = classNames('bg-[-button-primary] border-none text-white hover:opacity-90 mr-2');
    }
    if (outline) {
        hoverButton = classNames('border-red-500 text-red-500 mr-0');
    }
    if (noOutline) {
        hoverButton = classNames('bg-red-600 text-white font-semibold mr-0 w-32 hover:opacity-90 disabled:bg-gray-600');
    }
    if (explorer) {
        hoverButton = classNames('bg-gray-100 text-black font-semibold  border-none hover:bg-gray-200 mr-3 h-11');
    }

    if (primary && big) {
        hoverButton = classNames(
            'bg-red-600 text-white font-semibold mr-0 w-32 hover:opacity-90 disabled:bg-gray-600 min-w-40 min-h-12',
        );
    }
    if (outline && big) {
        hoverButton = classNames('border-red-500 text-red-500 mr-0 w-28 ');
    }
    if (primary && bigbig) {
        hoverButton = classNames(
            'bg-red-600 text-white font-semibold mr-0 hover:opacity-90 disabled:bg-gray-600 min-w-40 w-full min-h-12',
        );
    }

    if (text && big) {
        hoverButton = classNames('hover:bg-[-button-text] mr-2 disabled:opacity-25 min-w-40 min-h-12');
    }

    if (none) {
        hoverButton = classNames('border-none text-color font-semibold disabled:opacity-35 ');
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
