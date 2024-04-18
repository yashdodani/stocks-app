const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
const stockSerivce = require('./controllers/stocks');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', stockSerivce);

module.exports = app;
