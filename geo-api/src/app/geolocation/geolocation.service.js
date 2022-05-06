import axios from 'axios';
import 'dotenv/config';

export default {

    async getInfoFromAddress(address) {

        const endpoint = 'https://maps.googleapis.com/maps/api/geocode/json';
        const queryParams = {
            address: address,
            key: process.env.GEOLOCATION_API_KEY,
        }
    
        const result = await axios.get(endpoint, { params: queryParams })
            .then(response => {
                if (response.data.status != "OK") return { erro: true };

                return response.data.results[0];
            }).catch(error => {
                return error;
            });
        
        return result;
    
    },

    // Calcula a distancia entre dois pontos utilizando a formula de Haversine
    calculateDistanceBetweenTwoAdresses(adressOne, adressTwo) {
        const latAdressOneRadiano = adressOne.lat * (Math.PI/180);
        const lngAdressOneRadiano = adressOne.lng * (Math.PI/180);
        const latAdressTwoRadiano = adressTwo.lat * (Math.PI/180);
        const lngAdressTwoRadiano = adressTwo.lng * (Math.PI/180);

        const latDelta = Math.abs(latAdressOneRadiano - latAdressTwoRadiano);
        const lngDelta = Math.abs(lngAdressOneRadiano - lngAdressTwoRadiano);

        const a = Math.sin(latDelta/2) * Math.sin(latDelta/2) + Math.sin(lngDelta/2) * Math.sin(lngDelta/2) * Math.cos(latAdressOneRadiano) * Math.cos(latAdressTwoRadiano);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const raioDaTerra = 6371;
        const distanceInKm = raioDaTerra * c;

        return distanceInKm;
    },

    calculateDistanceBetweenAllAdresses(infoFromAddresses) {
        let biggestDiference = false;
        let smallestDiference = false;
        let allDiferences = [];

        // A combinação desses dois for garante que iremos testar cada par de endereço somente uma vez
        // Ao mesmo tempo em que comparamos qual é a menor/maior distancia
        for(let i = 0; i < infoFromAddresses.length - 1; i++) {
            const currentAddressLatLng = infoFromAddresses[i].geometry.location;

            for(let j = i + 1; j < infoFromAddresses.length; j++) {
                const nextAddressLatLng = infoFromAddresses[j].geometry.location;
                const distanceBetweenTheseAddresses = this.calculateDistanceBetweenTwoAdresses(currentAddressLatLng, nextAddressLatLng);

                const aux = {
                    origem: infoFromAddresses[i].formatted_address,
                    destino: infoFromAddresses[j].formatted_address,
                    distancia: distanceBetweenTheseAddresses
                };

                if(biggestDiference === false || distanceBetweenTheseAddresses > biggestDiference.distancia) {
                    biggestDiference = aux;
                }

                if(smallestDiference === false || distanceBetweenTheseAddresses < smallestDiference.distancia) {
                    smallestDiference = aux;
                }

                allDiferences.push(aux);
            }
        }

        // Formata o campo da distancia
        allDiferences.forEach(diference => diference.distancia = diference.distancia.toFixed(2) + " km");

        return {
            maior_distancia: biggestDiference,
            menor_distancia: smallestDiference,
            todas_distancias: allDiferences
        };
    }
    
};