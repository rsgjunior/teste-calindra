const axios = require('axios');
require('dotenv').config()

const getLatLngFromAddress = async (address) => {

    const endpoint = 'https://maps.googleapis.com/maps/api/geocode/json';
    const queryParams = {
        address: address,
        key: process.env.GEOLOCATION_API_KEY,
    }

    const result = await axios.get(endpoint, { params: queryParams })
        .then(response => {
            console.log(response.data);
            return response.data.results[0].geometry.location;
        }).catch(error => {
            return error;
        });
    
    return result;

};

module.exports = {
    async receiveAddressesToCalculate(request, response) {
        const { addresses } = request.body;

        console.log(">>> addresses: ", addresses);

        const result = await Promise.all(addresses.map(async (address) => getLatLngFromAddress(address)));

        console.log(">>> result: ", result);

        response.status(200).json(result);
    }
    
}