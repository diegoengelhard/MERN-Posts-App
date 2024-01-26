// Import User model
const User = require("../models/User.model");

// Import bcrypt
const bcrypt = require('bcrypt');

// Import jwt create token
const { createToken } = require('../utils/jwt.tools');

const controller = {};

// Register new user (Sign Up)
controller.signUp = async (req, res) => {
    try {
        // Get user input
        const { firstname, lastname, email, password, confirmPassword } = req.body;

        // Validate user input
        if (!(firstname || lastname || email || password || confirmPassword)) return res.status(400).json({ message: "Missing required fields!" });

        // Check if user already exist
        const user = await User.findOne({ email });

        if (user) return res.status(409).json({ message: "User Already Exists" });

        // Check if password matches the regular expression
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).send({ message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' });
        }

        // Check if password and confirmPassword match
        if (password !== confirmPassword) return res.status(400).json({ message: "Password and Confirm Password does not match" });
        
        // Salt & Hash password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);


        // Create user in our database
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });

        // Save new user
        await newUser.save();

        // Return new user
        res.status(201).send({ message: "User created successfully", user: newUser});
    } catch (err) {
        console.log(err);
    }
};

// Login user (Sign In)
controller.signIn = async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) return res.status(400).json({ message: "Missing required fields" });

        // Validate if user exist in our database
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User Not Found" });

        // Verify user password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).send({ message: 'Invalid password' });

        // Create token
        const token = createToken(user._id);

        // Sends successful response
        res.status(200).send({ token: token, user: user, message: 'User signed in successful' });
    } catch (error) {
        res.status(400).send(error);
    }
};

// Logout user
controller.logout = async (req, res) => {
    try {
        res.status(200).json({ message: "Logout" });
    } catch (err) {
        console.log(err);
    }
};

module.exports = controller;