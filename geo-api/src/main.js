const express = require('express');
const routes = require('./routes');

const app = express();
const porta = 3030;

app.use(express.json());
app.use(routes);

app.listen(porta, () => {
    console.log(`Servidor rodando e escutando a porta ${porta}`);
});