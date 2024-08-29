const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    }
}, { timestamps: true }); //total 7enteries (name,email,password,createdAt,updatedAt,_id,__v)

const User = mongoose.model('User', userSchema, 'users'); //collection name->users
//model name->User
//schema name->userSchema

module.exports = User;
