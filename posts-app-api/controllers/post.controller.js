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
        // Obtain page number from request query
        const { page } = req.query;

        // Define limit of pages
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // Define starting index of posts

        // Count total number of posts
        const total = await Post.countDocuments({});

        // Find posts
        const posts = await Post.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        // Return response
        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        return res.status(500).send({ error: "Internal server error" });
    }
}

// Get a single post by id
controller.getPost = async (req, res) => {
    try {
        // Obtain post id from request params
        const { id } = req.params;

        // Find post
        const post = await Post.findById(id);

        // Return post
        res.status(200).json(post);
    } catch (error) {
        return res.status(500).send({ error: "Internal server error" });
    }
}

// Get Posts by Search
controller.getPostsBySearch = async (req, res) => {
    try {
        // Obtain search query from request query
        const { searchQuery, tags } = req.query;

        // Create regex expression
        const title = new RegExp(searchQuery, 'i'); // i = case insensitive

        // Find posts
        const posts = await Post.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] }); // $in = finds all posts that have at least one tag in the tags array

        // Return posts
        return res.status(200).json({ data: posts });
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

// Comment on a post
controller.commentPost = async (req, res) => {
    try {
        // Obtain post id
        const { id } = req.params;

        // Obtain comment data from request body
        const { commentData } = req.body;

        // Check if post exists
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).send({ error: "Post not found" });
        }

        // Check comment isn't empty
        if (!commentData) {
            return res.status(400).send({ error: "Comment cannot be empty" });
        }

        // Check if comment isn't no more than 100 characters
        if (commentData.length > 100) {
            return res.status(400).send({ error: "Comment cannot be more than 100 chars" });
        }

        // Update post
        const updatedPost = await Post.findByIdAndUpdate(id, {
            $push: { comments: commentData }
        }, { new: true });

        // Return updated post
        return res.status(200).json(updatedPost);
    } catch (error) {
        return res.status(500).send(error);
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
        // Obtaibns user id
        const user = req.user;
        const userId = user._id.toString();

        // Obtain post id
        const { id } = req.params;

        // Check if user id exists
        if (!userId) {
            return res.status(401).send({ error: "Unauthorized: missing userId" });
        }

        // Check if post exists
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).send({ error: "Post not found" });
        }

        // Check if user already liked post
        const index = post.likes.findIndex((id) => id === userId);

        // if user already liked post, unlike post, else like post
        if (index === -1) {
            // Like post
            post.likes.push(userId);
        } else {
            // Unlike post
            post.likes = post.likes.filter((id) => id !== userId);
        }

        // Update post
        const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

        // Return updated post
        return res.status(200).json({message: "Post (un)liked successfully", data: updatedPost});

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = controller;