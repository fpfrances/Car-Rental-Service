//To Connect to MongoDB type "npm run dev"


require('dotenv').config();

const os = require('os');
const path = require('path');
const mongoose = require ('mongoose');
const connectDB = require('./dbConn');

const http = require ('http');
const fs = require ('fs');
const fsPromises = require ('fs').promises;

const PORT = process.env.PORT || 3500;

const server = http.createServer( (req, res) => {
    console.log(req.url, req.method);
})

connectDB();

mongoose.connection.once('open', ()=> {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
