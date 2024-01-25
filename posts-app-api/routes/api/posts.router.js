const express = require('express');
const router = express.Router();

// Imports Post Controller
const postController = require('../../controllers/post.controller');

// Imports Auth Middleware
const { authenticate } = require('../../middlewares/auth.middleware');

// Defines all routes
// GET Get all posts
router.get('/getPosts', postController.getPosts);

// POST Create new post
router.post('/createPost', authenticate, postController.createPost);

// PATCH Update post
router.patch('/:id', authenticate, postController.updatePost);

// DELETE Delete post
router.delete('/:id', authenticate, postController.deletePost);

// PATCH Like post
router.patch('/:id/likePost', authenticate, postController.toggleLike);

module.exports = router;