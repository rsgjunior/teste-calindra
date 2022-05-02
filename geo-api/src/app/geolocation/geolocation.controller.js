import GeolocationService from "./geolocation.service.js";

export default {

    async receiveAddressesToCalculate(request, response) {
        const { addresses } = request.body;

        console.log(">>> addresses: ", addresses);

        const result = await Promise.all(addresses.map(async (address) => GeolocationService.getLatLngFromAddress(address)));

        console.log(">>> result: ", result);

        response.status(200).json(result);
    }
    
};