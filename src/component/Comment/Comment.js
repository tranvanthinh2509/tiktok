import { useSelector } from 'react-redux';
import Image from '../Image/Image';
import CommentForm from './CommentForm';
import { convertTime } from '../ConvertTime/ConvertTime';
import moment from 'moment';

function Comment({
    comment,
    replies,
    handleDelete,
    activeComment,
    setActiveComment,
    addComment,
    updateComment,
    parentId = null,
}) {
    const user = useSelector((state) => state.user);
    const canReply = Boolean(comment.userId._id);
    const canEdit = Boolean(comment.userId._id);
    const canDel = comment.userId._id === user.id;
    const isReply = activeComment && activeComment.type === 'Reply' && activeComment.id === comment._id;
    const isEdit = activeComment && activeComment.type === 'Edit' && activeComment.id === comment._id;
    const handleDeleteComment = (id) => {
        handleDelete(id);
    };
    const replyId = parentId ? parentId : comment._id;
    const formatTime = (createdAt) => {
        return moment(createdAt).fromNow();
    };
    return (
        <div>
            <div className="flex justify-between ">
                <div className="flex mt-4 items-start ">
                    <Image
                        src={comment.userId.avatar}
                        alt="avatar"
                        className={`${
                            comment.parentId === null ? 'w-10 h-10' : 'w-6 h-6'
                        } object-cover rounded-[-50%] mr-3`}
                    />
                    <div className="">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="px-2 rounded-lg ">
                                    <p className="text-[-14] font-semibold">{comment.userId.name}</p>
                                    {!isEdit && <p className="h-auto max-w-80">{comment.content}</p>}
                                    {isEdit && (
                                        <CommentForm
                                            submitLabel="Edit"
                                            hasCancelButton
                                            initialText={comment.content}
                                            handleSubmit={(text) => updateComment(text, comment._id)}
                                            handleCancel={() => setActiveComment(null)}
                                        />
                                    )}
                                </div>
                                <div className="flex text-xs font-semibold text-gray-500 px-2">
                                    <div className="min-w-14 cursor-pointer mr-4">{formatTime(comment.createdAt)}</div>
                                    {canReply && (
                                        <div
                                            className="min-w-14 cursor-pointer"
                                            onClick={() => setActiveComment({ id: comment._id, type: 'Reply' })}
                                        >
                                            Reply
                                        </div>
                                    )}
                                    {canEdit && (
                                        <div
                                            className="min-w-14 cursor-pointer"
                                            onClick={() => setActiveComment({ id: comment._id, type: 'Edit' })}
                                        >
                                            Edit
                                        </div>
                                    )}
                                    {canDel && (
                                        <div
                                            className="cursor-pointer"
                                            onClick={() => handleDeleteComment(comment._id)}
                                        >
                                            Delete
                                        </div>
                                    )}
                                </div>
                                {isReply && (
                                    <CommentForm
                                        submitLabel="Reply"
                                        handleSubmit={(text) => addComment(text, replyId)}
                                    />
                                )}
                            </div>
                        </div>
                        {replies.length > 0 && (
                            <div className="">
                                {replies.map((reply) => (
                                    <Comment
                                        comment={reply}
                                        replies={[]}
                                        handleDelete={handleDelete}
                                        activeComment={activeComment}
                                        setActiveComment={setActiveComment}
                                        addComment={addComment}
                                        updateComment={updateComment}
                                        parentId={comment._id}
                                    />
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
