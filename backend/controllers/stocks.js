const fs = require('fs');
const axios = require('axios');
const router = require('express').Router();

// const dbPath = '../data/stocks.json';

const listOfTickers = [
    'MSFT',
    'AAPL',
    'NVDA',
    'GOOG',
    'AMZN',
    'META',
    'JPM',
    'WMT',
    'TSLA',
    'BRK/A',
    'BRK/B',
    'TSM',
    'LLY',
    'AVGO',
    'NVO',
    'V',
    'MA',
    'JNJ',
    'ORCL',
    'HD',
];

// const stocksData = JSON.parse(
//     fs.readFileSync(`${__dirname}/../data/stocks.json`)
// );

const fetchData = async (ticker) => {
    try {
        const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2023-01-09/2023-01-09?apiKey=ywfYJ3C_S23CpIHnl6XbM6z551QsPSqF`;
        const response = await axios.get(url);
        return response.data;
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
    console.log(numberOfTickers);
    const tickers = listOfTickers.slice(0, numberOfTickers);
    console.log(tickers);
    try {
        const promiseArray = tickers.map((ticker) => fetchData(ticker));
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
