// All API routes here
import axios from 'axios';

// define API url
const API_URL = 'http://localhost:3500/api';

// Define API Posts route
const API_POSTS = `${API_URL}/posts`;

// Posts Routes
const getPosts = () => axios.get(API_POSTS + '/getPosts');

const service = {
    getPosts,
}

export default service;