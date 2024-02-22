const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://rpettit088:T3HVz2FgzsbvdBrB@cluster0.1kb8cgw.mongodb.net/car_rental_db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Define the vehicle schema
const vehicleSchema = new mongoose.Schema({
    manufacturer: String,
    vehicleName: String,
    year: Number,
    color: String,
    type: String
});

// Create a Vehicle model
const Vehicle = mongoose.model('Vehicle', vehicleSchema);

// Parse JSON request body
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// POST route to add a new vehicle
app.post('/vehicles', async (req, res) => {
    try {
        // Create a new vehicle instance based on request body
        const newVehicle = new Vehicle(req.body);
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// Server code to fetch all vehicles and implement filtering

app.get('/vehicles', async (req, res) => {
    try {
        let query = {}; // Default query to fetch all vehicles

        // Implement filtering based on query parameters
        if (req.query.manufacturer) {
            query.manufacturer = req.query.manufacturer;
        }
        if (req.query.year) {
            query.year = req.query.year;
        }
        // Add more filters as needed
        
        const vehicles = await Vehicle.find(query);
        res.json(vehicles);
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        res.status(500).json({ error: 'Error fetching vehicles' });
    }
});