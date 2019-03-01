const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const carSchema = require('../mongooseSchemas/carSchema');
const database = "mongodb://localhost:27017/bs-dw";
mongoose.connect(database);


router.get('/', (req, res, next) => {
   carSchema.find({})
       .exec()
       .then(doc => {
           res.status(200).json(doc);
       })
       .catch(err => {
          res.status(500).json({
              error: "Error from GET cars/",
              details: err
          })
       });
});

router.get('/queries/:make', (req, res, next) => {
   carSchema.findByMake(req.params.make)
       .exec()
       .then(doc => {
           res.status(200).json(doc);
       })
       .catch(err => {
           res.status(500).json({
               error: "Error from GET cars/:make",
               details: err
           })
       })
});

router.get('/all_cars/recently_sold', (req, res, next) => {
   carSchema.findRecentlySold()
       .exec()
       .then(doc => {
           res.status(200).json(doc);
       })
       .catch(err => {
           res.status(500).json({
               error: "Error from GET cars/:recently_sold",
               details: err
           })
       })
});

router.post('/', (req, res, next) => {
    const newCar = new carSchema({
        _id: new mongoose.Types.ObjectId,
        owner: new mongoose.Types.String(req.params.owner),
        make: new mongoose.Types.String(req.params.make),
        model: req.params.model,
        release_date: req.params.release_date,
        price: req.params.price,
        type: req.params.type,
        gearbox: req.params.gearbox,
        sold: false
    });
    newCar
        .save()
        .then(result => {
            res.status(201).json({
                message: "Put request to cars/ endpoint",
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