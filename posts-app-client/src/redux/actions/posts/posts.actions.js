// Import service
import service from '../../service/service'

// Action creators 
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await service.getPosts();
        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error);
    }
}