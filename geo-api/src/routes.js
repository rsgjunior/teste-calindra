import express from 'express';
import GeolocationController from './app/geolocation/geolocation.controller.js';

const routes = express.Router();

// Para fins de teste
routes.get('/', (request, response) => {
    response.send('Hello World!');
});

// Geolocation
routes.post('/calculateDistance', GeolocationController.receiveAddressesToCalculate);

export default routes;