import axios from 'axios';
import 'dotenv/config';

export default {

    async getLatLngFromAddress (address) {

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
    
    }
    
};