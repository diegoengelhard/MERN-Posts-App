// All API routes here
import axios from 'axios';

// define API url
const API = axios.create({
    baseURL: 'http://localhost:3500/api'
});

// Add token to every request
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    
    return req;
});

// Posts Routes
// Gets all posts
const getPosts = () => API.get('/posts/getPosts');

// Get Posts by Search
const getPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

// Creates a new post
const createPost = (postData) => API.post('/posts/createPost', postData);

// Update a post
const updatePost = (id, postData) => API.patch(`/posts/${id}`, postData);

// Delete a post
const deletePost = (id) => API.delete(`posts/${id}`);

// Auth Routes
// Sign Up
const signUp = (userData) => API.post('/auth/signUp', userData);

// Sign In
const signIn = (userData) => API.post('/auth/signIn', userData);

// Logout
const logout = () => API.get('/auth/logout');

const service = {
    // Posts Routes
    getPosts,
    getPostsBySearch,
    createPost,
    updatePost, 
    deletePost,
    // Auth Routes
    signUp,
    signIn,
    logout
}

export default service;