const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username must be unique'],
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [30, 'Username must not exceed 30 characters'],
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        // match: [
        //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        //   'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long'
        // ]
    },
}, { timestamps: true });

module.exports = Mongoose.model('User', UserSchema);