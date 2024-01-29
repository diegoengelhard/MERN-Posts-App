import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Import Redux actions
import { commentPost } from '../../../redux/actions/posts/posts.actions';

// Import MUI components
import { Typography, TextField, Button, Divider } from '@material-ui/core/';

// Import styles
import useStyles from './PostDetails.styles';

// Import toast
import { toast } from 'react-toastify';

const CommentSection = ({ post }) => {
    // Obtain user from local storage
    const user = JSON.parse(localStorage.getItem('profile'));

    // Set states
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post?.comments);

    // Set dispatch
    const dispatch = useDispatch();

    // Set commentRef
    const commentRef = useRef(); // used to scroll to the comment section after a comment is added

    // Set styles
    const classes = useStyles();

    // Handle Add Comment
    const handleAddComment = async () => {
        if (!user) {
            return navigate('/auth');
        } else {
            try {
                // Add comment to post -> dispatch commentPost action
                const newComments = await dispatch(commentPost(post._id, { commentData: `${user.user.firstname}: ${comment}` }));

                // Set new comments to post comments
                setComments(newComments);

                // Clear comment input
                setComment('');

                // Scroll to the latest comment section
                commentRef.current.scrollIntoView({ behavior: 'smooth' });
            } catch (error) {
                console.log(error);
                toast.error('Error adding comment');
            }
        }
    }

    return (
        <>
            <div>
                <div className={classes.commentsOuterContainer}>
                    <div className={classes.commentsInnerContainer}>
                        {/* MAPS ALL COMMENTS */}
                        <Typography gutterBottom variant="h6">Comments</Typography>
                        {comments?.map((c, i) => (
                            <>
                            <Typography key={i} gutterBottom variant="subtitle1">
                                <strong>{c.split(': ')[0]}</strong>
                                {c.split(':')[1]}
                            </Typography>
                            <Divider style={{ margin: '10px 0' }} />
                            </>
                        ))}
                        <div ref={commentRef} />
                    </div>
                    {/* COMMENT BOX */}
                    <div style={{ width: '70%' }}>
                        <Typography gutterBottom variant="h6">Write a comment</Typography>
                        <TextField fullWidth minRows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
                        <br />
                        {/* BUTTON TO COMMENT */}
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length || !user} color="primary" variant="contained" onClick={handleAddComment}>
                            {user ? 'Comment' : 'Access now to comment'}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CommentSection