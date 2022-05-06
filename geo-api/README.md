# Desafio Back-end

Esse é o resultado do desafio do back-end que consiste em fazer uma API Rest que obtenha a latitude e longitude de um endereço dos serviços da google e calcule a distância entre eles

## Passo a passo para rodar

1 - Instalar as dependências
'npm install'

2 - Criar o arquivo .env e inserir a API Key do serviço de geolocation da Google. (Existe um arquivo .env de exemplo)

3 - Iniciar o servidor
'npm run dev'

4 - E então fazer uma requisição do tipo POST para o endereço /calculateDistance seguindo o padrão do JSON abaixo no body:
```
{
    "enderecos": [
        "Av. Rio Branco, 1 Centro, Rio de Janeiro",
        "Praça Mal. Âncora, 122",
        "Rua 19 de Fevereiro, 34"
    ]
}
```