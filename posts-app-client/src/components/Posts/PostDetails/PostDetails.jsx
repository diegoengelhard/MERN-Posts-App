import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

// Import Redux actions

// Import styles 
import useStyles from './PostDetails.styles';

// Import MUI components
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';

const PostDetails = () => {
    // Get post id from params
    const { id } = useParams();
    
    // Set dispatch
    const dispatch = useDispatch();

    // Set navigate
    const navigate = useNavigate();

    // Set styles
    const classes = useStyles();
    return (
        <div>PostDetails</div>
    )
}

export default PostDetails