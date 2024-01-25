const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: [true, 'Firstname is required'],
        trim: true,
        minlength: [3, 'Firstname must be at least 3 characters long'],
        maxlength: [50, 'Firstname must not exceed 50 characters'],
    },
    lastname: {
        type: String,
        required: [true, 'Lastname is required'],
        trim: true,
        minlength: [3, 'Lastname must be at least 3 characters long'],
        maxlength: [50, 'Lastname must not exceed 50 characters'],
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