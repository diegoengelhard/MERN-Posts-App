import React from 'react';

// Import React Redux
import { useSelector } from 'react-redux';

// Import Single Post component
import SinglePost from '../SinglePost/SinglePost.jsx';

// Import styles
import useStyles from './FeedPost.style.js';

const FeedPost = () => {
    // Get posts from Redux store
    const posts = useSelector((state) => state.posts);

    // Set styles
    const classes = useStyles();
    
    return (
        <>
            <h1>Feed Posts</h1>
            <SinglePost />
        </>
    )
}

export default FeedPost