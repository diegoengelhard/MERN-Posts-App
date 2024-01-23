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

const service = {
    getPosts,
    createPost
}

export default service;