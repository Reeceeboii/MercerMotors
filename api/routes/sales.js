const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const saleSchema = require('../mongooseSchemas/saleSchema');
const database = "mongodb://localhost:27017/bs-dw";
mongoose.connect(database);

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