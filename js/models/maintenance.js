const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({

    vehicleID:  String,
    
    details: {
        type: String,
        required: [true, 'Maintenance details are required']
    }, 

    expectedReturnDate: {
        type: Date, 
        required: [true, 'Expected Return Date is required']
    }
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);
