const mongoose = require ('mongoose');

// Define the vehicle schema
const vehicleSchema = new mongoose.Schema({
    manufacturer: String,
    vehicleName: String,
    year: Number,
    color: String,
    type: String,
    licensePlate: String,
    status: { type: String, enum: ['A', 'O', 'M'], default: 'A' } // Default status is 'A' (Available)
})

module.exports = mongoose.model('Vehicle', vehicleSchema);