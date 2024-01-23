const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        maxLength: [200, "Description cannot be longer than 200 characters"]
    },
    creator: {
        type: String,
        required: [true, "Creator is required"]
    },
    tags: {
        type: [String]
    },
    selectedFile: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

module.exports = Mongoose.model('Post', PostSchema);