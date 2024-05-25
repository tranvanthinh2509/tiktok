import Comment from './Comment';
import CommentForm from './CommentForm';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { useEffect, useState } from 'react';
import * as CommentService from '../../services/CommentService';
import { useSelector } from 'react-redux';

function Comments({ videoId, lengthComment }) {
    const user = useSelector((state) => state.user);
    const [comments, setComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null);
    const rootComments = comments.filter((comment) => comment.parentId === null);
    const getReplies = (commentId) => {
        return comments.filter((comment) => comment.parentId === commentId);
    };
    console.log('comment', comments);
    console.log('rootcommet', rootComments);
    const mutationGetComments = useMutationHooks(async (vid) => {
        const res = await CommentService.getComment(vid);
        setComments(res.data);
    });

    const mutationCreateComment = useMutationHooks(async (data) => {
        const { userId, videoId, content, parentId = null } = data;
        const res = await CommentService.createComment({ userId, videoId, content, parentId });
        setComments([res.data, ...comments]);
    });

    const mutationDeleteComment = useMutationHooks(async (id) => {
        await CommentService.deleteComment(id);
    });
    const addComment = (text, parentId) => {
        console.log('adđComment ', text, parentId);
        mutationCreateComment.mutate({ userId: user.id, videoId: videoId, content: text, parentId: parentId });
    };

    const deleteComment = (commentId) => {
        mutationDeleteComment.mutate(commentId);
        const updateComments = comments.filter((comment) => comment._id !== commentId);
        setComments(updateComments);
    };
    useEffect(() => {
        mutationGetComments.mutate(videoId);
    }, []);
    useEffect(() => {
        lengthComment(comments.length);
    }, [comments]);
    return (
        <div className="flex flex-col max-w-[-500]">
            <CommentForm submitLabel="Đăng" handleSubmit={addComment} />
            {rootComments.length !== 0 &&
                rootComments.map((root) => (
                    <Comment
                        comment={root}
                        replies={getReplies(root._id)}
                        handleDelete={deleteComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        addComment={addComment}
                    />
                ))}
        </div>
    );
}

export default Comments;
