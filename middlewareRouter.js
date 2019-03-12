const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const carRoutes = require('./api/routes/cars');
const saleRoutes = require('./api/routes/sales');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/cars', carRoutes);
app.use('/sales', saleRoutes);

module.exports = app;