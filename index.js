import express from 'express';
import cors from 'cors';

const server = express();
server.use(express.json());
server.use(cors());


const users = [];
const tweets = [];

server.post('/sign-up', (request, response) => {
    const user = request.body;
    if (!user.username|| !user.avatar) {
        response.status(400).send('Todos os campos são obrigatórios!');
        return;
    }   else {
        users.push(user);
        response.status(201).send('OK');
        return;
    }
  
});

server.get('/tweets', (request, response) => {
    const id = request.query.page;
    if (id < 1 || id === null) {
        response.status(400).send('Informe uma página válida!');
        return;
    }
    let lastTenTweets;
    if (parseInt(id) === 1) lastTenTweets = tweets.slice(-10);
    else lastTenTweets = tweets.slice(-10 * id, -10 * (id -1));
    lastTenTweets.forEach( tweet => tweet.avatar = users.find( user => user.username === tweet.username).avatar);
    response.status(201).send(lastTenTweets.reverse());
});

server.post('/tweets', (request, response) => {
    const { tweet } = request.body;
    const user = request.headers['user'];
    if (!tweet || !user) {
        response.status(400).send('Todos os campos são obrigatórios"');
        return;
    }   else {
        tweets.push({
            username: user,
            tweet,
        });
        response.status(201).send('OK');
        return;
    }
});

server.get('/tweets/:idUser', (request, response) => {
    const user = request.params.idUser;
    const userTweets = tweets.filter( tweet => tweet.username === user);
    userTweets.forEach( tweet => tweet.username = user);
    response.send(userTweets);
})

server.listen(5000, () => {
    console.log('Servidor no ar!');
});