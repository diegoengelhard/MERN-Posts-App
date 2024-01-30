import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Import Redux actions
import { deletePost, likePost } from '../../../redux/actions/posts/posts.actions';

// Import toast
import { toast } from 'react-toastify';

// Import styles
import useStyles from './SinglePost.styles';

// Import moment
import moment from 'moment';

// Import MUI components
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';


const SinglePost = ({ post, setCurrentId }) => {
    // Obtain user
    const user = JSON.parse(localStorage.getItem('profile'));
    console.log('postId: ', post.creator);

    // Set post likes
    const [likes, setLikes] = useState(post?.likes);

    console.log(post)

    // Set navigate
    const navigate = useNavigate();

    // Set dispatch
    const dispatch = useDispatch();

    // Set styles
    const classes = useStyles();

    // Obtain user id
    const userId = user?.user._id;
    console.log('userId: ', userId);

    // User has liked post
    const hasLikedPost = post.likes.find((like) => like === (userId));

    // Like post
    const handleLike = async () => {
        try {
            dispatch(likePost(post._id));

            if (hasLikedPost) {
                setLikes(post.likes.filter((id) => id !== userId));
            } else {
                setLikes([...post.likes, userId]);
            }
        } catch (error) {
            console.log(error);
            toast.error('Error liking post');
        }
    }

    // Delete post
    const handleDelete = () => {
        dispatch(deletePost(post._id));
        toast.success('Post deleted successfully!');
    }

    // Open Post Detials Page
    const openPost = () => {
        navigate(`/posts/${post._id}`);
    }

    // Post Likes
    const Likes = () => {
        if (likes.length > 0) {
            return likes.find((like) => like === userId)
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    return (
        <>
            <Card className={classes.card}>
                <ButtonBase
                    component="span"
                    name="test"
                    className={classes.cardAction}
                    onClick={openPost}
                >
                    {/* Post Image + Post Title */}
                    <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
                    {/* Card Post Creator */}
                    <div className={classes.overlay}>
                        <Typography variant="h6">{post.creator}</Typography>
                    </div>
                    {/* Edit Post Info ... */}
                    <div className={classes.overlay2}>
                        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="medium" />Edit</Button>
                    </div>
                    {/* Post Tags */}
                    <div className={classes.details}>
                        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                    </div>
                    {/* Post Title */}
                    <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
                    {/* Post Description */}
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">{post.description}</Typography>
                    </CardContent>
                </ButtonBase>
                {/* Post Actions */}
                <CardActions className={classes.cardActions}>
                    {/* LIKE POST */}
                    <Button size="small" color="primary" disabled={!user?.user} onClick={handleLike}>
                        <Likes />
                    </Button>
                    {/* DELETE POST */}
                    {(user?.user.username === post.creator) && (
                        <Button size="small" color="secondary" onClick={handleDelete}>
                            <DeleteIcon fontSize="small" />
                            Delete
                        </Button>
                    )}
                </CardActions>
            </Card>
        </>
    )
}

export default SinglePost