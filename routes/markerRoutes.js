const express = require('express');
const router = express.Router();
const Marker = require('./../models/marker.js');

router.get('/', (req, res) => {
    Marker.find( {
        username: req.query.username,
        lat: req.query.lat,
        lng: req.query.lng,
    })
    .then((marker) => {
        console.log('marker: ' + marker);
        res.status(200).send(marker);
    })
    .catch((error) => {
        res.status(400)
    })
});
router.get('/markers', (req, res) => {
    Marker.find( {} ).exec()
    .then((results) => {
        res.status(200).send(results);
    })
    .catch((error) => {
        res.sendStatus(400);
    })
});
router.post('/markers',  (req, res) => {
    const marker = new Marker({
        username: req.body.username,
        description: req.body.description,
        lat:  req.body.lat,
        lng:  req.body.lng,
    });
    marker.save()
    .then(() => {
        console.log(`uploaded ${req.body.username}  ${req.body.lat} ${req.body.lng}`);
        res.status(200).send('Marker saved successfully');
    })
    .catch(err => {
        console.log(err);
        res.status(400).send('Error saving marker to database');
    })
});
router.post('/removemarker', (req, res) => {
    Marker.findOneAndRemove( {
        username: req.body.username,
        lat: req.body.lat,
        lng: req.body.lng
    }).then((results) => {
        console.log('results: ' + results);
        res.status(200).send(results);
    })
    .catch((error) => {
        res.sendStatus(400);
    })
});

module.exports = router;