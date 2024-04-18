const fs = require('fs');
const axios = require('axios');
const router = require('express').Router();
const listOfTickers = require('../utils/tickers');

// const dbPath = '../data/stocks.json';
// const stocksData = JSON.parse(
//     fs.readFileSync(`${__dirname}/../data/stocks.json`)
// );

const generateId = () => Math.floor(Math.random() * 10000);

const randomRefreshInterval = () => Math.floor(Math.random() * 5 + 1);

const fetchData = async (ticker) => {
    try {
        const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2023-01-09/2023-01-09?apiKey=ywfYJ3C_S23CpIHnl6XbM6z551QsPSqF`;
        const response = await axios.get(url);

        const returnedData = {
            ticker: response.data.ticker,
            prices: response.data.results[0],
            id: generateId(),
            refreshInterval: randomRefreshInterval(),
        };
        console.log(returnedData);
        return returnedData;
    } catch (err) {
        console.log(err.message);
    }
};

// const saveDataToDB = (data) => {
//     const newId = stocksData.length + 1;
//     const newStock = Object.assign({
//         id: newId,
//         ticker: data.ticker,
//         prices: data.results,
//     });

//     console.log(stocksData);
//     fs.writeFileSync(
//         `${__dirname}/../data/stocks.json`,
//         JSON.stringify(stocksData)
//     );
// };

router.get('/', (req, res) => {
    res.status(200).send('hello from server');
});

router.get('/stocks/:n', async (req, res) => {
    const numberOfTickers = Number(req.params.n);
    const tickers = listOfTickers.slice(0, numberOfTickers);
    console.log(tickers);
    try {
        const promiseArray = tickers.map((item) => fetchData(item.ticker));
        const fullData = await Promise.all(promiseArray);
        fs.writeFileSync(
            `${__dirname}/../data/stocks.json`,
            JSON.stringify(fullData)
        );

        res.status(200).send(fullData);
    } catch (err) {
        console.log(err);
        console.log(err.message);
        res.status(500).end();
    }
});

module.exports = router;
