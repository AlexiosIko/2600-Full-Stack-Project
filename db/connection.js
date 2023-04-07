require('dotenv').config(); // This for my enirovment variable

const mongoose = require("mongoose");


// let mongoDB = process.env.DB_CONNECTION; // GITHUB HIDES MY .ENV FILE SO IT DOESN'T WORK
let mongoDB = 'mongodb+srv://Alexi:verysecurepassword@cluster0.yjwaf2u.mongodb.net/google-maps-project';

module.exports = mongoose.connect(mongoDB);