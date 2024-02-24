import classNames from 'classnames';

function MenuItem({ data, onClick, ...pastProps }) {
    const props = {
        onClick,
        ...pastProps,
    };

    let separate;

    if (data.separate) {
        separate = classNames('border-t border-gray-300');
    }

    let item = classNames('h-10 w-66 flex items-center px-4 py-2 hover:bg-slate-200 hover:cursor-pointer', separate);

    return (
        <div className={item} {...props}>
            <span className="mr-2">{data.icon}</span>
            <p className="text-[-16] font-semibold">{data.title}</p>
        </div>
    );
}

export default MenuItem;
