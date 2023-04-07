require('dotenv').config(); // This for my enirovment variable

const mongoose = require("mongoose");
let mongoDB = process.env.DB_CONNECTION;
module.exports = mongoose.connect(mongoDB);