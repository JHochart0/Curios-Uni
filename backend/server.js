require('dotenv').config({path: './.env'});

const port = process.env.PORT || 3000;

const http = require('http');
const app = require('./app');

const server = http.createServer(app);

server.listen(port, ()=>{
    console.log(`Le serveur écoute sur http://127.0.0.1:${port}/`);
});