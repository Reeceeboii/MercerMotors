const express = require('express');
const app = express();

const carRoutes = require('./api/routes/cars');

app.use('/cars', carRoutes);

module.exports = app;