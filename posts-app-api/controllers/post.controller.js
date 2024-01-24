// Import Post model
const Post = require('../models/Post.model');

const controller = {};

// Create new post
controller.createPost = async (req, res) => {
    try {
        // Obtain post data from request body
        const { creator, title, description, tags, selectedFile } = req.body;

        // Create new post
        const post = new Post({
            creator,
            title,
            description,
            tags,
            selectedFile
        });

        // Save new post
        const newPost = await post.save();

        // Return new post
        return res.status(201).json(newPost);
    } catch (error) {
        return res.status(500).send({ error: "Internal server error" });
    }
};

// Get all posts
controller.getPosts = async (req, res) => {
    try {
        // Find posts
        const posts = await Post.find();

        // Return posts
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).send({ error: "Internal server error" });
    }
}

// Update post
controller.updatePost = async (req, res) => {
    try {
        // Obtain post id
        const { id } = req.params;

        // Obtain post data from request body
        const { creator, title, description, tags, selectedFile } = req.body;

        // Check if post exists
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).send({ error: "Post not found" });
        }

        // Update post
        const updatedPost = await Post.findByIdAndUpdate(id, {
            creator,
            title,
            description,
            tags,
            selectedFile
        }, { new: true });

        // Return updated post
        return res.status(200).json(updatedPost);
    } catch (error) {
        return res.status(500).send({ error: "Internal server error" });
    }
}

module.exports = controller;