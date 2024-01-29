const express = require('express');
const router = express.Router();

// Imports Post Controller
const postController = require('../../controllers/post.controller');

// Imports Auth Middleware
const { authenticate } = require('../../middlewares/auth.middleware');

// Defines all routes
// GET get a single post by id
router.get('/getPost/:id', postController.getPost);

// GET Get all posts
router.get('/getPosts', postController.getPosts);

// GET Get Posts by Search
router.get('/search', postController.getPostsBySearch);

// POST Create new post
router.post('/createPost', authenticate, postController.createPost);

// PATCH Update post
router.patch('/:id', authenticate, postController.updatePost);

// DELETE Delete post
router.delete('/:id', authenticate, postController.deletePost);

// PATCH Like post
router.patch('/:id/likePost', authenticate, postController.toggleLike);

// POST Comment on post
router.post('/:id/commentPost', authenticate, postController.commentPost);

module.exports = router;