// Import Post model
const Post = require('../models/Post.model');

const mongoose = require('mongoose');

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

// Delete Post
controller.deletePost = async (req, res) => {
    try {
        // Obtain post id
        const { id } = req.params;

        // Check if post exists
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).send({ error: "Post not found" });
        }

        // Delete post
        await Post.findByIdAndDelete(id);

        // Return success message
        return res.status(200).send({ message: "Post deleted successfully" });
    } catch (error) {
        return res.status(500).send({ error: "Internal server error" });
    }
}

// Like Post
controller.toggleLike = async (req, res) => {
    try {
        // Obtains post id from request params
        const { id } = req.params

        // Verify if post exists
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

        // Find post
        const post = await Post.findById(id);

        // Check if user has already liked the post
        const index = post.likes.findIndex((id) => id === String(req.userId));

        // If user has already liked the post, remove like
        if (index === -1) {
            post.likes.push(req.userId);
        } else {
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }

        // Update post
        const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

        // Return updated post
        res.status(200).json({message: "Post updated successfully", updatedPost});

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = controller;