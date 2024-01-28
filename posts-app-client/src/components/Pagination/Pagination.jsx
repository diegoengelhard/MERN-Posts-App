import React from 'react';
import { Link } from 'react-router-dom';

// Import pagination from MUI
import { Pagination, PaginationItem } from '@mui/material';

// Import styles
import useStyles from './Pagination.styles';

const Paginate = () => {
    // Set styles
    const classes = useStyles();
    return (
        <>
            <Pagination
                classes={{ ul: classes.ul }}
                count={4}
                page={1}
                variant="outlined"
                color="primary"
                renderItem={(item) => (
                    <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
                )}
            />
        </>
    )
}

export default Paginate