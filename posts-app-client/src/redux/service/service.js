// All API routes here
import axios from 'axios';

// define API url
const API_URL = 'http://localhost:3500/api';

// Define API Posts route
const API_POSTS = `${API_URL}/posts`;

// Posts Routes
// Gets all posts
const getPosts = () => axios.get(API_POSTS + '/getPosts');

// Creates a new post
const createPost = (postData) => axios.post(API_POSTS + '/createPost', postData);

// Update a post
const updatePost = (id, postData) => axios.patch(`${API_POSTS}/${id}`, postData);

// Delete a post
const deletePost = (id) => axios.delete(`${API_POSTS}/${id}`);

const service = {
    getPosts,
    createPost,
    updatePost, 
    deletePost
}

export default service;