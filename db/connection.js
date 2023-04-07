require('dotenv').config(); // This for my enirovment variable
const mongoose = require("mongoose");

let mongoDB = process.env.DB_CONNECTION; // GITHUB HIDES MY .ENV FILE SO IT DOESN'T WORK
module.exports = mongoose.connect(mongoDB);