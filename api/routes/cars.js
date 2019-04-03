const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const sanitise = require('mongo-sanitize');
const carSchema = require('../mongooseSchemas/carSchema');
const saleSchema = require('../mongooseSchemas/saleSchema');


//const database = "mongodb://localhost:27017/bs-dw";
const database = `mongodb+srv://bs-dw-access:${process.env.mongoPassword}@businesssystemscluster-3l9va.mongodb.net/test?authSource=admin`;
mongoose.connect(database).then( () => console.log("connected"));


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

function createNewSale (carID, buyer){
    let car;
    carSchema.findById(carID)
       .exec()
       .then(doc => {
           car = doc;
       })
        .then( () => {
            const newSale = new saleSchema({
                _id: new mongoose.Types.ObjectId(),
                car_id: car._id,
                buyer: buyer,
                seller: car.owner,
                sale_total: car.price
            });
            newSale
            .save()
        })
        .catch(err => {
            console.log(err);
        })
}

// update a car's sold status to 'true' to mark it as sold. This request is bound to a callback function that
// creates a new document in the sales collection with the relevant information
router.put('/mark-as-sold/:id', (req, res, next) => {
    carSchema.findOneAndUpdate({_id:sanitise(req.params.id)}, {sold:true})
        .exec()
        .then(createNewSale(sanitise(req.params.id), req.body.buyer))
        .then( (doc) =>
            res.status(200).json({
                message:"Sale marking successful!",
                details: doc
            }))
        .catch(err => {
            res.status(500).json({
                error: "Error from PUT cars/mark-as-sold/:id",
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
        .then( () => {
            res.redirect(201, 'http://localhost:3000/user')
        })
        .catch(err => {
            res.status(500).json({
                error: "Error from post route of car",
                details: err
            });
        })
});





module.exports = router;
