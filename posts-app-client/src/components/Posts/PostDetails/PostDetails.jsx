import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

// Import Redux actions
import { getPost } from '../../../redux/actions/posts/posts.actions';

// Import styles 
import useStyles from './PostDetails.styles';

// Import MUI components
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';

const PostDetails = () => {
    // Get post from global state
    const { post, isLoading } = useSelector((state) => state.posts);

    // Get post id from params
    const { id } = useParams();

    // Set dispatch
    const dispatch = useDispatch();

    // Set navigate
    const navigate = useNavigate();

    // Set styles
    const classes = useStyles();

    // Get post by id
    useEffect(() => {
        dispatch(getPost(id));
    }, [id]);

    //  If no post, return message
    if (!post) return (
        <>
            <Typography variant="h4">No post available yet</Typography>
        </>
    );

    // If loading, return loading spinner
    if (isLoading) return (
        <>
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        </>
    );

    return (
        <>
            <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                <div className={classes.card}>
                    <div className={classes.section}>
                        <Typography variant="h3" component="h2">{post.title}</Typography>
                        <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                        <Typography gutterBottom variant="body1" component="p">{post.description}</Typography>
                        <Typography variant="h6">Created by: {post.creator}</Typography>
                        <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                        <Divider style={{ margin: '20px 0' }} />
                        <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
                    </div>
                    <div className={classes.imageSection}>
                        <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                    </div>
                </div>
            </Paper>
        </>
    )
}

export default PostDetails