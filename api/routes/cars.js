const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const sanitise = require('mongo-sanitize');
const carSchema = require('../mongooseSchemas/carSchema');
const database = "mongodb://localhost:27017/bs-dw";
mongoose.connect(database);


router.get('/search/:search', (req, res, next) => {
    carSchema.getAllForSale(sanitise(req.params.search))
       .exec()
       .then(doc => {
           res.status(200).json(doc);
       })
       .catch(err => {
          res.status(500).json({
              error: "Error from GET cars/:search",
              details: err
          })
       });
});

router.get('/id/:id', (req, res, next) => {
    const id = sanitise(req.params.id);
    carSchema.findByID(id)
       .exec()
       .then(doc => {
           res.status(200).json(doc);
       })
       .catch(err => {
           res.status(500).json({
               error: "Error from GET cars/id/:id",
               details: err
           })
       })
});

router.get('/recently_sold', (req, res, next) => {
   carSchema.findRecentlySold()
       .exec()
       .then(doc => {
           res.status(200).json(doc);
       })
       .catch(err => {
           res.status(500).json({
               error: "Error from GET cars/recently_sold",
               details: err
           })
       })
});

router.post('/create_new', (req, res, next) => {
    const newCar = new carSchema({
        _id: new mongoose.Types.ObjectId(),
        owner: req.body.owner,
        make: req.body.make,
        model: req.body.model,
        release_date: req.body.release_date,
        price: req.body.price,
        type: req.body.type,
        gearbox: req.body.gearbox,
        sold: false
    });
    newCar
        .save()
        .then(result => {
            res.status(201).json({
                message: "Post request to cars/create_new endpoint was successful",
                createdCar: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "Error from post route of car",
                details: err
            });
        })
});

module.exports = router;