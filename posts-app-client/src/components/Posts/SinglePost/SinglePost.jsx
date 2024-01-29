import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Import Redux actions
import { deletePost } from '../../../redux/actions/posts/posts.actions';

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


const SinglePost = ({ post, setCurrentId }) => {
    // Obtain user
    const user = JSON.parse(localStorage.getItem('profile'));
    console.log('postId: ', post.creator);

    console.log(post)

    if (user.user._id === post.creator) {
        console.log('user is creator');
    }

    // Set navigate
    const navigate = useNavigate();

    // Set dispatch
    const dispatch = useDispatch();

    // Set styles
    const classes = useStyles();

    // Delete post
    const handleDelete = () => {
        dispatch(deletePost(post._id));
        toast.success('Post deleted successfully!');
    }

    // Open Post Detials Page
    const openPost = () => {
        navigate(`/posts/${post._id}`);
    }

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
                    <Button size="small" color="primary" onClick={() => { }}><ThumbUpAltIcon fontSize="small" /> Like </Button>
                    <Button size="small" color="primary" onClick={handleDelete}><DeleteIcon fontSize="small" /> Delete</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default SinglePost