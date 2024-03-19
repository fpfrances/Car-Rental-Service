const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true // Ensure that usernames are required
    },
    userAddress: {
        type: String,
        required: true // Ensure that userAddress is required
    }, 
    userPhone: {
        type: String,
        unique: true, 
        required: true // Ensure that userPhone is required
    },
    userEmail: {
        type: String,
        unique: true, 
        required: true // Ensure that userEmail is required
    },
    userPassword: {
        type: String,
        unique: true, 
        required: true // Ensure that userPassword is required
    },
    userType: {
        type: String,
        required: true,
        enum: ['customer', 'employee'], // Define allowed user types
        default: 'customer' // Default user type for new sign-ups
    }
});

module.exports = mongoose.model('User', userSchema);
