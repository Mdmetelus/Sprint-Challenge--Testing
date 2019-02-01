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




server.post("/games", (req, res) => {
    
    const { title, genre } = req.body;
    const game = req.body;

    if (!title || !genre) {
    res.status(422).json({ Error: 'Please add the title and genre' });
    }
    db('games')
    .insert(game)
    .then(eachGame => {
      res.status(201).json({ message: 'New game added' });
    })
    .catch(err => {
      res.status(500).json({Error: 'Error inserting'});
    });

  });

module.exports = server;