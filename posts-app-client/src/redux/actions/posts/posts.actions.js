// Import service
import service from '../../service/service'

// Action creators 
// Gets all posts
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await service.getPosts();
        dispatch({ type: 'FETCH_ALL', payload: data });
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