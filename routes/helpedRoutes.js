const express = require('express');
const router = express.Router();
const Helped = require('../models/helped.js');

router.get('/getallhelped', (req, res) => {
    Helped.find({})
    .then(results => {
        res.status(200).send(results);
    })
    .catch(error => {
        res.sendStatus(400);
    })
})
router.post('/removeallhelped', (req, res) => {
    Helped.deleteMany({})
    .then(results => {
        res.status(200).send('Removed all helped');
    })
    .catch(error => {
        res.sendStatus(400);
    });
})
router.post('/addhelped', (req, res) => {
    const helped = new Helped ({
        username: req.body.username,
        time: req.body.time,
    })
    helped.save()
    .then(() => {
        console.log(`uploaded ${req.body.username} ${req.body.time}`);
        res.status(200).send('Helped saved successfully');
    })
    .catch(err => {
        console.log(err);
        res.status(400).send('Error saving helped to database');
    })
});

module.exports = router;