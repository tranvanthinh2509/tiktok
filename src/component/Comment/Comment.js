import { useSelector } from 'react-redux';
import Image from '../Image/Image';

function Comment({ comment, replies }) {
    const user = useSelector((state) => state.user);
    console.log('reply', replies);
    return (
        <div>
            <div className="flex justify-between ">
                <div className="flex mt-2 ">
                    <Image
                        src={comment.userId === user.id ? user.avatar : comment.userId.avatar}
                        alt="avatar"
                        className={`${
                            comment.parentId === null ? 'w-10 h-10' : 'w-6 h-6'
                        } object-cover rounded-[-50%] mr-3`}
                    />
                    <div className="">
                        <div className="flex justify-between items-center">
                            <div className="px-2 py-1 bg-gray-100 rounded-lg ">
                                <p className="text-[-14] font-semibold">{comment.userId.name}</p>
                                <p className="h-auto ">{comment.content}</p>
                            </div>
                            <div className="ml-3">oke</div>
                        </div>
                        {replies.length > 0 && (
                            <div className="">
                                {replies.map((reply) => (
                                    <Comment comment={reply} replies={[]} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comment;
