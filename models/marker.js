const mongoose = require('mongoose');

const markerSchema = new mongoose.Schema({
    username: { type: String, maxlength: 15 },
    description: String,
    lat: Number,
    lng: Number
});

module.exports = mongoose.model("Marker", markerSchema);