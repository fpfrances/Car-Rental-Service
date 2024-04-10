const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
    details: {
        type: String,
        required: [true, 'Maintenance details are required']
    }, 

    expectedReturnDate: {
        type: Date, 
        required: [true, 'Expected Return Date is required']
    }, 
    licensePlate: String // Store the license plate instead of the VehicleId
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);
