import React from 'react';

// Import React Redux
import { useSelector } from 'react-redux';

// Import Single Post component
import SinglePost from '../SinglePost/SinglePost.jsx';

// Import MUI components
import { Grid, CircularProgress, Typography } from '@material-ui/core';

// Import styles
import useStyles from './FeedPost.style.js';

const FeedPost = ({ setCurrentId }) => {
    // Get posts from Redux store
    const { posts, isLoading } = useSelector((state) => state.posts);
    console.log(posts);

    // Set styles
    const classes = useStyles();

    // If no posts and not loading, return message
    if (!posts.length && !isLoading) return (
        <>
            <Typography variant="h4">No posts available yet</Typography>
        </>
    );

    return (
        <>
            {isLoading ?
                <CircularProgress /> : (
                    // Fetch posts 
                    <Grid className={classes.container} container alignItems="stretch" spacing={2}>
                        {posts.map((post) => (
                            <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                                <SinglePost post={post} setCurrentId={setCurrentId} />
                            </Grid>
                        ))}
                    </Grid>
                )
            }
        </>
    )
}

export default FeedPost