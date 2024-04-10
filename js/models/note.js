const mongoose = require('mongoose');

// Define Maintenance schema
const maintenanceSchema = new mongoose.Schema({
    note: {
        type: String,
        required: true
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    }
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);
