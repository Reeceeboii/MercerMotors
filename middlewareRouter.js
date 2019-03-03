const express = require('express');
const app = express();

const carRoutes = require('./api/routes/cars');
const saleRoutes = require('./api/routes/sales');

app.use('/cars', carRoutes);
app.use('/sales', saleRoutes);

module.exports = app;