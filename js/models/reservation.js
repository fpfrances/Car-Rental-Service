const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new mongoose.Schema({

    customerName: {
        type: String,
        required: [true, 'Customer name is required']
    },
    customerEmail: {
        type: String,
        required: [true, 'Customer email is required'],
        unique: true // Assuming each reservation is tied to a unique customer email
    },
    customerAddress: {
        type: String,
        required: [true, 'Customer address is required']
    },
    pickupDate: {
        type: Date,
        required: [true, 'Pick-up date is required']
    },
    dropOffDate: {
        type: Date,
        required: [true, 'Drop-off date is required']
    },
    
    vehicle: {
        type: Schema.Types.ObjectId, // Reference to the vehicle document's ObjectId
        ref: 'Vehicle', // Reference the Vehicle model
        required: [true, 'Vehicle ID is required']
    }

});

// Optional: Create an index for quicker lookup by customer email
reservationSchema.index({ customerEmail: 1 });

// MAKE SURE TO ADD THIS TO THE TOP OF WHATEVER FILE YOU WANT TO CREATE A RESERVATION OBJECT IN
//const Reservation = require('./models/reservation');

module.exports = mongoose.model('Reservation', reservationSchema);