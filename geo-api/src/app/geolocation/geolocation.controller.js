import GeolocationService from "./geolocation.service.js";

export default {

    async receiveAddressesToCalculate(request, response) {
        const { enderecos } = request.body;

        // Valida se tem no mínimo 3 endereços
        if (enderecos.length < 3) {
            return response.status(400).json({ erro: "No mínimo 3 endereços devem ser fornecidos" });
        }

        const infoFromAddresses = await Promise.all(enderecos.map(async (address) => {
            return GeolocationService.getInfoFromAddress(address)
        }));

        // Se algum endereço da lista não retornar dados na API do google
        // ele retornará com esse atributo "erro"
        if(infoFromAddresses.some(address => address.erro)) {
            return response.status(400).json({ erro: "Algum endereço da lista é inválido" });
        }

        const result = GeolocationService.calculateDistanceBetweenAllAdresses(infoFromAddresses);

        return response.status(200).json(result);
    }
    
};