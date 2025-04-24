const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const loginSchema = new mongoose.Schema({
    userEmail: {
        type: String
    },
    userPassword: {
        type: String
    }
});

module.exports = mongoose.model('Login', loginSchema);