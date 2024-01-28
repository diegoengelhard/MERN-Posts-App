import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

// Import MUI components
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core';

// Import styles
import useStyles from '../../styles';

// Import Redux actions
import { getPosts, getPostsBySearch } from '../../redux/actions/posts/posts.actions';

// Import components
import Form from '../../components/Form/Form';
import Posts from '../../components/Posts/FeedPost/FeedPost';
import Paginate from '../../components/Pagination/Pagination';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const HomeView = () => {
    // Set post id state
    const [currentId, setCurrentId] = useState(null);

    // Get query
    const query = useQuery();

    // Set navigate
    const navigate = useNavigate();

    // Set page
    const page = query.get('page') || 1;

    // Set search query
    const searchQuery = query.get('searchQuery');

    const classes = useStyles();

    // Set dispatch
    const dispatch = useDispatch();

    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    // Use Effect to dispatch getPosts action
    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    // Search function
    const searchPost = () => {
        if (search.trim() || tags.length) {
            // convert tags to string: [fun, dev] => fun,dev
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
    
            // Navigate to search page
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            navigate('/');
        }
    }

    // Handle key press for tag search
    const handleKeyPress = (e) => {
        // If enter key is pressed
        if (e.keyCode === 13) {
            searchPost();
        }
    }

    // Handle add tag
    const handleAdd = (tag) => setTags([...tags, tag]);

    // Handle delete tag
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    return (
        <>
            <Container >
                <Grow in>
                    <Container maxWidth="xl">
                        <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                            {/* POSTS */}
                            <Grid item xs={12} sm={6} md={9}>
                                {/* POSTS FEED */}
                                <Posts setCurrentId={setCurrentId} />
                            </Grid>

                            {/* FORM & PAGINATION */}
                            <Grid item xs={12} sm={6} md={3}>
                                {/* SEARCH CARD */}
                                <AppBar className={classes.appBarSearch} position="static" color="inherit">
                                    <TextField
                                        name="search"
                                        variant="outlined"
                                        label="Search Posts"
                                        fullWidth
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                    />
                                    <ChipInput
                                        style={{ margin: '10px 0' }}
                                        value={tags}
                                        onAdd={handleAdd}
                                        onDelete={handleDelete}
                                        label="Search Tags"
                                        variant="outlined"
                                    />
                                    <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                                </AppBar>

                                {/* FORM TO POST */}
                                <Form currentId={currentId} setCurrentId={setCurrentId} />

                                {/* PAGINATION (TEMP) */}
                                <Paper className={classes.pagination} elevation={6}>
                                    <Paginate />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Grow>
            </Container>
        </>
    )
}

export default HomeView