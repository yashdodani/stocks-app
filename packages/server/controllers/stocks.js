const fs = require('fs');
const axios = require('axios');
const router = require('express').Router();
const listOfTickers = require(`${__dirname}/../utils/tickers`);

// add your api-key to the .env file
const API_KEY = process.env.API_KEY;

const generateId = () => Math.floor(Math.random() * 10000);

const randomRefreshInterval = () => Math.floor(Math.random() * 5 + 1) * 1000;

const fetchData = async (ticker) => {
    try {
        const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2023-01-09/2023-01-09?apiKey=${API_KEY}`;

        const response = await axios.get(url);

        const returnedData = {
            ticker: response.data.ticker,
            prices: response.data.results[0],
            id: generateId(),
            refreshInterval: randomRefreshInterval(),
            lastUpdatedAt: Date.now(),
        };
        return returnedData;
    } catch (err) {
        console.log(err.message);
    }
};

router.get('/:n', async (req, res) => {
    fs.writeFileSync(`${__dirname}/../data/stocks.json`, '');

    let numberOfTickers = Number(req.params.n);
    const tickers = listOfTickers.slice(0, numberOfTickers);

    try {
        // fetch data on the basis of 'symbols' or 'tickers' in the list.
        const promiseArray = tickers.map((item) => fetchData(item.ticker));
        const fullData = await Promise.all(promiseArray);

        fs.writeFileSync(
            `${__dirname}/../data/stocks.json`,
            JSON.stringify(fullData)
        );

        res.status(200).send(fullData);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
