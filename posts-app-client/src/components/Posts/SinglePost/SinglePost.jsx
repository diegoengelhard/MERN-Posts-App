import React from 'react';

import { useDispatch } from 'react-redux';

// Import styles
import useStyles from './SinglePost.styles';

// Import moment
import moment from 'moment';

// Import MUI components
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';


const SinglePost = ({ post, setCurrentId }) => {
    // Set dispatch
    const dispatch = useDispatch();

    // Set styles
    const classes = useStyles();

    return (
        <>
            <Card className={classes.card}>
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
                {/* Post Actions */}
                <CardActions className={classes.cardActions}>
                    <Button size="small" color="primary" onClick={() => {}}><ThumbUpAltIcon fontSize="small" /> Like </Button>
                    <Button size="small" color="primary" onClick={() => {}}><DeleteIcon fontSize="small" /> Delete</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default SinglePost