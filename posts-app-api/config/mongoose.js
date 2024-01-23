const mongoose = require('mongoose');

// Obtains MongoDB URI from environment variables
const mongdbUri = process.env.MONGODB_URI;

// Connects to MongoDB
const connect = async () => {
    try {
        await mongoose.connect(mongdbUri);
        console.log("Successfully connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
}

module.exports = {
    connect
}