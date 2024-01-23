// All API routes here
import axios from 'axios';

// define API url
const API_URL = 'http://localhost:3500/api';

// Define API Posts route
export const API_POSTS = `${API_URL}/posts`;

// Posts Routes
export const getPosts = () => axios.get(API_POSTS + '/getPosts');