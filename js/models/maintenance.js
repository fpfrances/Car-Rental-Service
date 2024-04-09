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
    VehicleId: String
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);
