const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const carSchema = require('../mongooseSchemas/carSchema');
const database = "mongodb://localhost:27017/bs-dw";
mongoose.connect(database);

router.get('/', (req, res, next) => {
    carSchema.find({}).exec(function (err, cars){
        if (err) res.send("Mongoose is being funky");
        res.status(200).json(cars);
    })
});

router.get('/:make', (req, res, next) => {
    carSchema.find({make: req.params.make}).exec(function (err, cars) {
        if (err) res.send("extra funky");
        res.status(200).json(cars);
    })
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling POST requests to /cars"
    })
});

module.exports = router;