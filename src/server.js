/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

require('dotenv').config();

const app = express();

const PORT = 3000;

// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const checkApi = require('./api/check/routes');
const usersApi = require('./api/users/routes');
const authenticationsApi = require('./api/authentications/routes');
const itemsApi = require('./api/items/routes');
const Items = require('./utils/items');

// get item
function getItemData() {
    axios.get('https://fakestoreapi.com/products').then((response) => {
        const products = response.data;
        Items.push(...products);
    }).catch((error) => {
        console.log(error);
    });
}

getItemData();

app.use('/api/check', checkApi);
app.use('/api/users', usersApi);
app.use('/api/authentications', authenticationsApi);
app.use('/api/products', itemsApi);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
