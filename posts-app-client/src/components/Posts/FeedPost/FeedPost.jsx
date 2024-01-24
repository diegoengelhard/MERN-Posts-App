import React from 'react';

// Import React Redux
import { useSelector } from 'react-redux';

// Import Single Post component
import SinglePost from '../SinglePost/SinglePost.jsx';

// Import MUI components
import { Grid, CircularProgress, Typography } from '@material-ui/core';

// Import styles
import useStyles from './FeedPost.style.js';

const FeedPost = () => {
    // Get posts from Redux store
    const posts = useSelector((state) => state.posts);
    console.log(posts);

    // Set styles
    const classes = useStyles();

    return (
        <>
            {!posts.length ?
                <Typography variant="h4">No posts yet</Typography> : (
                    // Fetch posts 
                    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                        {posts.map((post) => (
                            <Grid key={post._id} item xs={12} sm={6} md={6}>
                                <SinglePost post={post} />
                            </Grid>
                        ))}
                    </Grid>
                )
            }
        </>
    )
}

export default FeedPost