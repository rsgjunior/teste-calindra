const express = require('express');
const GeolocationController = require('./app/geolocation/geolocation.controller');

const routes = express.Router()

routes.get('/', (request, response) => {
    response.send('Hello World!');
});

// Geolocation
routes.post('/calculateDistance', GeolocationController.receiveAddressesToCalculate);

module.exports = routes