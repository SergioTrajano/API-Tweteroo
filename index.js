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
});

server.get('/tweets', (request, response) => {
    const lastTenTweets = tweets.slice(-10);
    lastTenTweets.forEach( tweet => tweet.avatar = users.find( user => user.username === tweet.username).avatar);
    response.send(lastTenTweets.reverse());
});

server.post('/tweets', (request, response) => {
    const tweet = request.body;
    tweets.push(tweet);
    response.send('OK');
});







server.listen(5000, console.log('Servidor no ar!'));