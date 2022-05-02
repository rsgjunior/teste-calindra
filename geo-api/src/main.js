import express from 'express';
import routes from './routes.js';

const app = express();
const port = 3030;

app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`Servidor rodando e escutando a porta ${port}`);
});