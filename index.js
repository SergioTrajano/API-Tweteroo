import express from 'express';
import cors from 'cors';

const server = express();
server.use(express.json());
server.use(cors());


const users = [];
const tweets = [];

server.post('/sign-up', (request, response) => {
    const user = request.body;
    users.push(user);
    response.send('OK');
})





server.listen(5000, console('Servidor no ar!'));