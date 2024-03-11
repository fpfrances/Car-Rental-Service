// reservation.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Vehicle = require('./vehicle');

const reservationSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: [true, 'Customer name is required']
    },
    customerEmail: {
        type: String,
        required: [true, 'Customer email is required'],
        unique: true
    },
    customerAddress: {
        type: String,
        required: [true, 'Customer address is required']
    },
    pickupDate: {
        type: Date,
        required: [true, 'Pick-up date is required']
    },
    dropoffDate: {
        type: Date,
        required: [true, 'Drop-off date is required']
    },
    ID: String
});

module.exports = mongoose.model('Reservation', reservationSchema);
