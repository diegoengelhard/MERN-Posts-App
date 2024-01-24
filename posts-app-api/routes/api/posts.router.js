const express = require('express');
const router = express.Router();

// Imports Post Controller
const postController = require('../../controllers/post.controller');

// Defines all routes
// GET Get all posts
router.get('/getPosts', postController.getPosts);

// POST Create new post
router.post('/createPost', postController.createPost);

// PATCH Update post
router.patch('/:id', postController.updatePost);

// DELETE Delete post
router.delete('/:id', postController.deletePost);

// PATCH Like post
router.patch('/:id/likePost', postController.toggleLike);

module.exports = router;