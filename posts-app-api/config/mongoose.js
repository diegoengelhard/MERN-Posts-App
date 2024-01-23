const mongoose = require('mongoose');

// Obtains MongoDB URI from environment variables
const mongodbUri = process.env.MONGODB_URI;
const port = process.env.PORT;

// Connects to MongoDB
const connect = async () => {
    try {
        await mongoose.connect(mongodbUri);
        console.log("Successfully connected to MongoDB! Listening on port " + port + "...");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
}

module.exports = {
    connect
}