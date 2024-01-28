import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Import Redux Actions
import { getPosts } from '../../redux/actions/posts/posts.actions';

// Import pagination from MUI
import { Pagination, PaginationItem } from '@mui/material';

// Import styles
import useStyles from './Pagination.styles';

const Paginate = ({ page }) => {
    // Get num of pages from global state
    const { numberOfPages } = useSelector((state) => state.posts);
    // Set dispatch
    const dispatch = useDispatch();

    // Set styles
    const classes = useStyles();

    // Get posts from global state
    useEffect(() => {
        if (page) {
            dispatch(getPosts(page));
        }
    }, [dispatch, page]);

    return (
        <>
            <Pagination
                classes={{ ul: classes.ul }}
                count={numberOfPages}
                page={Number(page) || 1}
                variant="outlined"
                color="primary"
                renderItem={(item) => (
                    <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
                )}
            />
        </>
    )
}

export default Paginate