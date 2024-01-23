// Import Post model
const Post = require('../models/Post.model');

const controller = {};

// Create new post
controller.createPost = async (req, res) => {
    try {
        // TODO: Logic
        return res.status(200).send({message: 'Create post'});
    } catch (error) {
        return res.status(500).send({ error: "Internal server error" });
    }
};

// Get all posts
controller.getPosts = async (req, res) => {
    try {
        // TODO: Logic
        return res.status(200).send({message: 'Get posts'});
    } catch (error) {
        return res.status(500).send({ error: "Internal server error" });
    }
}

module.exports = controller;