const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const databaseURL = "mongodb://localhost:27017";
const app = express();

app.get('/api/cars', (req, res) => {
    MongoClient.connect(databaseURL, function (err, db) {
        if (err) throw err;
        let dbo = db.db('bs-dw');
        dbo.collection("cars").find({}).toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        })
    });
})

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);