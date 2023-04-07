const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connection = require('./db/connection.js');
const Marker = require('./models/marker.js');
const Helped = require('./models/helped.js');
const markerRoute = require('./routes/markerRoutes.js');
const helpedRoute = require('./routes/helpedRoutes.js');
require('dotenv').config();

// This is so parse objects as json format through axios.post(() => {})
app.use(express.json());

connection.then(() => {
    app.listen(8080, () => {
        console.log("Listening...");
    })
});

app.use(express.static('public'));


// Middleware
const validateMarker = (req, res, next) => {
    const { username, description, lat, lng } = req.body;
  
    // Check if all required fields are present
    if (!username || !description || !lat || !lng) {
      return res.status(400).json({ message: 'One or more fields are null' });
    }
  
    // Check if lat and lng are numbers
    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({ message: 'Latitude and longitude should be numbers.' });
    }
  
    // If all GOOD then got to next
    next();
};
const validateHelper = (req, res, next) => {
    const { username, time } = req.body;
    console.log(username, time);

    // Check if all required fields are present
    if (!username || !time) {
        return res.status(400).json({ message: 'One or more fields are null' });
    }

    // If all GOOD then got to next
    next();
}

// Routes
app.get('/', (req, res) => {
    res.sendFile('index.html');
});
app.use('/marker', markerRoute);
app.post('/removemarker', markerRoute);
app.get('/markers', markerRoute);
app.get('/getallhelped', helpedRoute);
app.post('/removeallhelped', helpedRoute);
app.post('/addhelped', validateHelper, helpedRoute);
app.post('/markers', validateMarker,  markerRoute);