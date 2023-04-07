const mongoose = require('mongoose');

const markerSchema = new mongoose.Schema({
    username: String,
    time: String
});

module.exports = mongoose.model("Helped", markerSchema);