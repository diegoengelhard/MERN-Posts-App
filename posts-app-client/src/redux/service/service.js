// All API routes here
import axios from 'axios';

// define API url
const API_URL = 'http://localhost:3500/api';

// Define API Posts route
const API_POSTS = `${API_URL}/posts`;

// DEFINE API Auth route
const API_AUTH = `${API_URL}/auth`;

// Posts Routes
// Gets all posts
const getPosts = () => axios.get(API_POSTS + '/getPosts');

// Creates a new post
const createPost = (postData) => axios.post(API_POSTS + '/createPost', postData);

// Update a post
const updatePost = (id, postData) => axios.patch(`${API_POSTS}/${id}`, postData);

// Delete a post
const deletePost = (id) => axios.delete(`${API_POSTS}/${id}`);

// Auth Routes
// Sign Up
const signUp = (userData) => axios.post(API_AUTH + '/signUp', userData);

// Sign In
const signIn = (userData) => axios.post(API_AUTH + '/signIn', userData);

// Logout
const logout = () => axios.get(API_AUTH + '/logout');

const service = {
    // Posts Routes
    getPosts,
    createPost,
    updatePost, 
    deletePost,
    // Auth Routes
    signUp,
    signIn,
    logout
}

export default service;