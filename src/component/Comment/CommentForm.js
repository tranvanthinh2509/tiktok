import { useState } from 'react';
import Button from '../Layout/component/Button/Button';

function CommentForm({ submitLabel, handleSubmit }) {
    const [text, setText] = useState('');

    const onChangText = (e) => {
        setText(e.target.value);
    };
    return (
        <div className="w-full flex items-center justify-around my-5">
            <textarea
                placeholder="Thêm bình luận..."
                className="w-3/4 px-2 py-1 outline-none border border-gray-300 rounded-xl"
                value={text}
                onChange={(e) => onChangText(e)}
            />
            <Button none disabled={text.length === 0} onClick={() => handleSubmit(text)}>
                {submitLabel}
            </Button>
        </div>
    );
}

export default CommentForm;
{
}
