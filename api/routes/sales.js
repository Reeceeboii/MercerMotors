const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const saleSchema = require('../mongooseSchemas/saleSchema');

// I only want to import local .env files when not in production
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const database = `mongodb+srv://bs-dw-access:${process.env.REACT_APP_MONGO_PASSWORD}@businesssystemscluster-3l9va.mongodb.net/test?authSource=admin`;
mongoose.connect(database, {useNewUrlParser: true}).then( () => console.log("sales API connected"));

// gets all sales for a particular username
router.get('/:username', (req, res, next) => {
    saleSchema.findUserSales(req.params.username)
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({
                error: "Error from GET sales/:username",
                details: err
            })
        });
});

router.post('/create-new', (req, res, next) => {
    const newSale = new saleSchema ({
        buyer: req.body.buyer,
        seller: req.body.seller,
        sale_total: req.body.sale_total
    });
    newSale
        .save()
        .then(result => {
            res.status(201).json({
                message: "Post request to sales/create-new endpoint was successful",
            })
        })
        .catch(err => {
            res.status(500).json({
                error: "Error from post to sales/create-new endpoint",
                details: err
            });
        })

});


module.exports = router;
