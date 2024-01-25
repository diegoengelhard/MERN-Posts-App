const express = require('express');
const router = express.Router();

// Import Auth controller
const controller = require('../../controllers/auth.controller');

// Register new user (Sign Up)
router.post('/signUp', controller.signUp);

// Login user (Sign In)
router.post('/signIn', controller.signIn);

// Logout user
router.get('/logout', controller.logout);

module.exports = router;