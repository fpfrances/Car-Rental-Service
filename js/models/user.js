const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Username is required'],
        unique: true // Ensure that usernames are unique
    },
    userEmail: {
        type: String,
        unique: true // Ensure that usernames are unique
    }, 
    userType: {
        type: String,
        required: true,
        enum: ['customer', 'employee'], // Define allowed user types
        default: 'customer' // Default user type for new sign-ups
    }
});

// this line is optional but helps mongoDB lookup usernames very quickly
// no extra steps are needed by us mongodb stores these indexes and uses them when needed
// the 1 means ascending order
userSchema.index({ username: 1 });


// MAKE SURE TO ADD THIS TO THE TOP OF WHATEVER FILE YOU WANT TO CREATE A USER OBJECT IN
//const User = require('./models/user');

module.exports = mongoose.model('User', userSchema);