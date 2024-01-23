import React, { useState, useEffect }  from 'react';
import { useDispatch } from 'react-redux';

// Import MUI components
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

// Import styles
import useStyles from '../../styles';

// Import Redux actions
import { getPosts } from '../../redux/actions/posts/posts.actions';

// Import components
import Form from '../../components/Form/Form';
import Posts from '../../components/Posts/FeedPost/FeedPost';

const HomeView = () => {
    const classes = useStyles();

    // Set dispatch
    const dispatch = useDispatch();

    // Use Effect to dispatch getPosts action
    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <>
            <Container maxWidth="lg">
                <AppBar className={classes.appBar} position="static" color="inherit">
                    <Typography className={classes.heading} variant="h2" align="center"> Posts App </Typography>
                    {/* <img className={classes.image} src='' alt="" height="60" /> */}
                </AppBar>
                <Grow in>
                    <Container>
                        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                            <Grid item xs={12} sm={7}>
                                {/* POSTS FEED */}
                                <Posts />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                {/* FORM */}
                                <Form />
                            </Grid>
                        </Grid>
                    </Container>
                </Grow>
            </Container>
        </>
    )
}

export default HomeView