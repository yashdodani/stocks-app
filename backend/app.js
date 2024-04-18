const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const stockSerivce = require('./controllers/stocks');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('hello');
});

app.use('/api/stocks', stockSerivce);

module.exports = app;
