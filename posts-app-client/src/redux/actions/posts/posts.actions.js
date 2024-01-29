// Import service
import service from '../../service/service'

// Action creators 
// Gets all posts
export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data } = await service.getPosts(page);

        dispatch({ type: 'FETCH_ALL', payload: data });
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error);
    }
}

// Get a single post by id
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data } = await service.getPost(id);

        dispatch({ type: 'FETCH_POST', payload: data });
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error);
    }
}

// Creates a new post
export const createPost = (postData) => async (dispatch) => {
    try {
        const { data } = await service.createPost(postData);
        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error);
    }
}

// Update a post
export const updatePost = (id, postData) => async (dispatch) => {
    try {
        const { data } = await service.updatePost(id, postData);
        dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
        console.log(error);
    }
}

// Comment on a post
export const commentPost = (id, commentData) => async (dispatch) => {
    try {
        const { data } = await service.commentPost(id, commentData);
        dispatch({ type: 'COMMENT', payload: data });
        return data.comments;
    } catch (error) {
        console.log(error);
    }
}

// Delete a post
export const deletePost = (id) => async (dispatch) => {
    try {
        await service.deletePost(id);
        dispatch({ type: 'DELETE', payload: id });
    } catch (error) {
        console.log(error);
    }
}

// Get Posts by Search
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data: { data } } = await service.getPostsBySearch(searchQuery);
        console.log(data);
        dispatch({ type: 'FETCH_BY_SEARCH', payload: data });
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error);
    }
}