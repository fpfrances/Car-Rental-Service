const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./dbConn');

const Vehicle = require('./models/vehicle');
const Reservation = require('./models/reservation');
const User = require('./models/user');
const Maintenance = require('./models/maintenance');

const app = express();


const PORT = process.env.PORT || 3001;
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

// Route to handle reservation submission
app.post('/reservation', async (req, res) => {
    try {
        const { customerName, customerEmail, customerAddress, pickupDate, dropoffDate, licensePlate } = req.body;

        // Find the vehicle based on its license plate
        const vehicle = await Vehicle.findOne({ licensePlate });

        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }

        // Update the vehicle status to 'O' (Out)
        vehicle.status = 'O';
        await vehicle.save();

        // Create a new reservation
        const newReservation = new Reservation({
            customerName,
            customerEmail,
            customerAddress,
            pickupDate,
            dropoffDate,
            VehicleID: vehicle._id// Link the reservation to the vehicle
        });

        // Save the reservation to the database
        await newReservation.save();

        res.status(201).json({ message: 'Reservation submitted successfully' });
    } catch (error) {
        console.error('Error submitting reservation:', error);
        res.status(500).json({ error: 'Error submitting reservation' });
    }
});


// POST route to add a new user
app.post('/users', async (req, res) => {
    try {
        const { userName, userEmail, userAddress, userPhone, userPassword } = req.body;

        // Create a new user account
        const newUser = new User({
            userName,
            userEmail,
            userAddress,
            userPhone,
            userPassword
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: 'New user submitted successfully' });
    } catch (error) {
        console.error('Error submitting new user:', error);
        res.status(500).json({ error: 'Error submitting new user' });
    }
});



// POST route for login
app.post('/login', async (req, res) => {
    const { userEmail, userPassword } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ userEmail });

        // If user doesn't exist, return error
        if (!user) {
            return res.status(401).send('Invalid email');
        }

        // Function to hash password using SHA-256
        async function sha256(str) {
            const encoder = new TextEncoder();
            const data = encoder.encode(str);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
            return hashHex;
        }
        // Hash the provided password using SHA-256
        const hashedPassword = await sha256(userPassword);

        // Compare the hashed password with the hashed password from the database
        const passwordMatch = hashedPassword === user.userPassword;

        // If passwords don't match, return error
        if (!passwordMatch) {
            return res.status(401).send('Invalid password');
        }

        // Authentication successful
        let redirectPage = '/';
        if (user.userType === 'customer') {
            redirectPage = '../pages/indexCustomer.html';
        } else if (user.userType === 'employee') {
            redirectPage = '../pages/indexStaff.html';
        }

        res.json({ message: 'Login successful', redirect: redirectPage });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Route to handle returning a vehicle
app.post('/return', async (req, res) => {
    try {
        const { customerName, customerEmail } = req.body;

        // Find the reservation based on customer name and email
        const reservation = await Reservation.findOne({ customerName, customerEmail });

        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        // Find the vehicle based on the reservation's VehicleID
        const vehicle = await Vehicle.findById(reservation.VehicleID);

        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }

        // Change the vehicle's status to 'A' (Available)
        vehicle.status = 'A';
        await vehicle.save();

        // Delete the reservation
        await Reservation.findByIdAndDelete(reservation._id);

        res.status(200).json({ message: 'Vehicle returned successfully' });
    } catch (error) {
        console.error('Error returning vehicle:', error);
        res.status(500).json({ error: 'Error returning vehicle' });
    }
});

//Route for handling maintenance report form submission
app.post('/maintenanceReportSubmission', async (req, res) => {
    try {
        const licensePlate = req.body.licensePlate;
        const expectedReturnDate = req.body.expectedReturnDate;
        const details = req.body.details;

        //Find the vehicle that is being entered into maintenance using its license plate
        const vehicle = await Vehicle.findOne({ licensePlate });

        //Return error if vehicle not found
        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }

        // Update vehicle status to 'M' (Maintenance) and save the changes
        vehicle.status = 'M';
        await vehicle.save();

        // Create a new maintenance document
        const newMaintenance = new Maintenance({
            details,
            expectedReturnDate,
            licensePlate // Store vehicle's license plate in the maintenance record
        });

        // Save the maintenance record to the database
        await newMaintenance.save();

        res.status(201).json({ message: 'Maintenance report submitted successfully' });
    } catch (error) {
        console.error('Error submitting maintenance report:', error);
        res.status(500).json({ error: 'Error submitting maintenance report' });
    }
});

// Finds the maintenance for a vehicle
app.get('/findMaintenance', async (req, res) => {
    try {
        const licensePlate = req.query.licensePlate;

        // Find the maintenance for the given vehicle's license plate
        const maintenance = await Maintenance.findOne({ licensePlate });

        if (!maintenance) {
            return res.status(404).json({ error: 'Maintenance not found' });
        }
        res.status(200).json({ maintenance });
    } catch (error) {
        console.error('Error finding maintenance', error);
        res.status(500).json({ error: 'Error finding maintenance' });
    }
});

// Route that deletes the maintenance
app.delete('/exit-maintenance', async (req, res) => {
    try {
        const licensePlate = req.body.licensePlate;

        console.log('Received request to exit maintenance for vehicle with license plate:', licensePlate);

        // Find and check the maintenance record associated with the vehicle's license plate
        const maintenance = await Maintenance.findOne({ licensePlate });

        // Find the vehicle by its license plate
        const vehicle = await Vehicle.findOne({ licensePlate });

        console.log('Found vehicle:', vehicle);

        // Change the vehicle's status back to 'A' (Available)
        vehicle.status = 'A';
        await vehicle.save();

        console.log('Vehicle status updated to Available');

        // Delete the maintenance record associated with the vehicle's license plate
        await Maintenance.findOneAndDelete({ licensePlate });

        console.log('Maintenance record deleted successfully');

        res.status(201).json({ message: 'Maintenance record deleted successfully' });
    } catch (error) {
        console.error('Error during maintenance deletion:', error);
        return res.status(500).json({ error: 'Failed to delete maintenance record' });
    }
});
