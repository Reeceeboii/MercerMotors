const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const sanitise = require('mongo-sanitize');
const carSchema = require('../mongooseSchemas/carSchema');
const saleSchema = require('../mongooseSchemas/saleSchema');
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

// update a car's sold status to 'true' to mark it as sold. Then create a new document in the sales
// collection with the relevant information
router.put('/mark-as-sold/:id', (req, res, next) => {
    const id = sanitise(req.params.id);
    let car;
    carSchema.findByIdAndUpdate({_id : id}, req.body.sold)
        .exec()
        .then( () => {
            carSchema.findOne({_id : id})
                .exec()
                .then(doc => car = doc)
                .then(
                    fetch('sales/create-new', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            car_id: car._id,
                            buyer: req.body.buyer,
                            seller: car.owner
                        })
                    })
                        .then(doc => {
                            res.status(200).json(doc);
                        })
                        .catch(err => {
                            res.status(500).json({
                                error: "Error creating new sale",
                                details: err
                            })
                        })
                );
        })
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({
                error: "Error from POST cars/mark-as-sold/:id",
                details: err
            })
        })
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

router.get('/owned_by/:username', (req, res, next) => {
    const username = sanitise(req.params.username);
    carSchema.ownedBy(username)
        .exec()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({
                error: "Error from get cars/owned_by/:username",
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
            })
        })
        .catch(err => {
            res.status(500).json({
                error: "Error from post route of car",
                details: err
            });
        })
});

module.exports = router;