// Import User model
const User = require('../models/User.model');

// Import jwt tools
const { verifyToken } = require('../utils/jwt.tools');

const authMiddleware = {};

authMiddleware.authenticate = async (req, res, next) => {
    try {
        // Obtain token from request header
        const token = req.header('Authorization');

        // Check if token exists
        if (!token) return res.status(401).send({ message: "Access denied" });

        // Verify token
        const verified = verifyToken(token);

        // If token is invalid, send error response
        if (!verified) return res.status(401).send({ message: "Invalid token" });

        // Obtain user from token
        const user = await User.findById(verified.userId);

        // If user does not exist, send error response
        if (!user) return res.status(401).send({ message: "User does not exist" });

        // Add user to request object
        req.user = user;

        // Move to next middleware
        next();
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = authMiddleware;