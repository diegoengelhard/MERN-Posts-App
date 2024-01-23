// Import Post model
const Post = require('../models/Post.model');

const controller = {};

// Create new post
controller.createPost = async (req, res) => {
    try {
        // TODO: Logic
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Get all posts
controller.getPosts = async (req, res) => {
    try {
        // TODO: Logic
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = controller;