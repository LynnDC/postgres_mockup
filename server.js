'use strict';

const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
const conString = process.env.DATABASE_URL || 'postgres://localhost:5432/';
const client = new pg.Client(conString);

client.connect();
client.on('error', (error) => console.error(error));

app.use(express.static('./public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

loadDB();

app.post('/profile', (request, response) => {
  client.query(
    `INSERT INTO profile(first, last, age)
    VALUES ($1, $2, $3);`,
    [request.body.first, request.body.last, request.body.age]
  )
    .then(() => response.send('insert complete'))
    .catch(err => console.log(err))
});


function loadDB() {
  client.query(`
    CREATE TABLE IF NOT EXISTS profile (
    profile_id SERIAL PRIMARY KEY,
    first VARCHAR(50) NOT NULL,
    last VARCHAR(50) NOT NULL,
    age INTEGER NOT NULL,
    )`)
    .catch(err => {
      console.log(err)
    });
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`))
