const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const saleSchema = require('../mongooseSchemas/saleSchema');
const database = "mongodb://localhost:27017/bs-dw";
mongoose.connect(database);

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

module.exports = router;