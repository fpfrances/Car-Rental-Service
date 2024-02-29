const mongoose = require ('mongoose');


const vehicleSchema = new mongoose.Schema({
    
    manufacturer: {
        type: String,
        required: [true, 'Manufacturer is required']
    },
    vehicleName: { // Renamed for clarity
        type: String,
        required: [true, 'Model is required']
    },
    year: {
        type: Number,
        required: [true, 'Year is required']
    },
    color: {
        type: String,
        required: [true, 'Color is required']
    },
    type: {
        type: String,
        required: [true, 'Type is required']
    },
    pricePerDay: {
        type: Number,
        //required: [true, 'Price per day is required']
    },
    licensePlate: String, // Not marked as required, assuming it's only relevant for workers
    status: { 
        type: String, 
        enum: ['A', 'O', 'M'], 
        default: 'A', // Available
        required: [true, 'Status is required']
    }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
