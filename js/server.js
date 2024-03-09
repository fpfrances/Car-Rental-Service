const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./dbConn');

const Vehicle = require('./models/vehicle');
const Reservation = require('./models/reservation');

const app = express();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//connects to mongoDB car_rental_db
connectDB();

// Parse JSON request body
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// POST route to add a new vehicle
app.post('/vehicles', async (req, res) => {
    try {
        // Extract the license plate characters from the request body
        const licensePlate = req.body.licensePlate;

        // Create a new vehicle instance based on request body
        const newVehicle = new Vehicle({
            manufacturer: req.body.manufacturer,
            vehicleName: req.body.vehicleName,
            year: req.body.year,
            color: req.body.color,
            type: req.body.type,
            licensePlate: licensePlate, // Assign the extracted license plate
            status: 'A' // Set the status to 'A' (Available) by default
        });

        // Save the new vehicle to the database
        await newVehicle.save();

        // Send a success response
        res.status(201).json({ id: newVehicle._id }); // Return the ID of the newly added vehicle
    } catch (error) {
        // Handle errors
        console.error('Error adding vehicle:', error);
        res.status(500).json({ error: 'Error adding vehicle' });
    }
});

// Server code to fetch all vehicles and implement filtering

app.get('/vehicles', async (req, res) => {
    try {
        let query = {};

        if (req.query.manufacturer) {
            query.manufacturer = req.query.manufacturer;
        }
        if (req.query.vehicleName) {
            query.vehicleName = req.query.vehicleName;
        }
        if (req.query.year) {
            query.year = req.query.year;
        }
        if (req.query.type) {
            query.type = req.query.type;
        }
        if (req.query.color) {
            query.color = req.query.color;
        }
        if (req.query.licensePlate) {
            query.licensePlate = req.query.licensePlate; // Filter by license plate
        }

        const vehicles = await Vehicle.find(query);
        res.json(vehicles);
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        res.status(500).json({ error: 'Error fetching vehicles' });
    }
});