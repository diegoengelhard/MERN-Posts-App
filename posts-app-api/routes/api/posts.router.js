const express = require('express');
const router = express.Router();

// Imports Post Controller
const postController = require('../../controllers/post.controller');

// Defines all routes
// GET Get all posts
router.get('/getPosts', postController.getPosts);

// POST Create new post
router.post('/createPost', postController.createPost);

module.exports = router;