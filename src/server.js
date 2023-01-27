/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

const PORT = 3000;

// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const checkApi = require('./api/check/routes');
const usersApi = require('./api/users/routes');
const authenticationsApi = require('./api/authentications/routes');

app.use('/api/check', checkApi);
app.use('/api/users', usersApi);
app.use('/api/authentications', authenticationsApi);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
