import Comment from './Comment';
import CommentForm from './CommentForm';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { useEffect, useState } from 'react';
import * as CommentServive from '../../services/CommentService';
import { useSelector } from 'react-redux';

function Comments({ videoId }) {
    const user = useSelector((state) => state.user);
    console.log('user', user);
    const [comments, setComments] = useState([]);
    const rootComments = comments.filter((comment) => comment.parentId === null);
    const getReplies = (commentId) => {
        return comments.filter((comment) => comment.parentId === commentId);
    };
    console.log('comment', comments);
    console.log('rootcommet', rootComments);
    const mutationGetComments = useMutationHooks(async (vid) => {
        const res = await CommentServive.getComment(vid);
        setComments(res.data);
    });

    const mutationCreateComment = useMutationHooks(async (data) => {
        const { userId, videoId, content } = data;
        const res = await CommentServive.createComment({ userId, videoId, content });
        console.log('123', res.data);
        setComments([res.data, ...comments]);
    });
    const addComment = (text, parentId) => {
        console.log('adđComment ', text, parentId);
        mutationCreateComment.mutate({ userId: user.id, videoId: videoId, content: text });
    };

    useEffect(() => {
        mutationGetComments.mutate(videoId);
    }, []);
    return (
        <div className="flex flex-col max-w-[-500]">
            <CommentForm submitLabel="Đăng" handleSubmit={addComment} />
            {rootComments.length !== 0 &&
                rootComments.map((root) => <Comment comment={root} replies={getReplies(root._id)} />)}
        </div>
    );
}

export default Comments;
