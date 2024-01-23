const express = require('express');
const router = express.Router();

// Imports all routers
const postRouter = require('./posts.router');

// Defines all routes
router.use("/posts", postRouter);

module.exports = router;