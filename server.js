const express = require("express");
const server = express();

const db = require('./data/dbConfig');


server.use(express.json());


server.get('/', (req, res) => {

    res.status(200).send(`API working.\n Sanity Check\n Test Route!`);

});

server.get('/games', (req, res) => {
    db('games')
    .then(games => res.status(200).json(games))
    .catch(error =>res.status(500).json(error))
});

module.exports = server;