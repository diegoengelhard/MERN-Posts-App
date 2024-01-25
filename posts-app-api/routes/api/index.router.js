const express = require('express');
const router = express.Router();

// Imports all routers
const postRouter = require('./posts.router');
const authRouter = require('./auth.router');

// Defines all routes
router.use("/posts", postRouter);
router.use("/auth", authRouter);

module.exports = router;