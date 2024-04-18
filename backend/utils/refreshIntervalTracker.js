const fs = require('fs');
let origListOfStocks = require('./tickers');

let stocksData;

const updateStockData = () => {
    console.log('checking');
    stocksData = [];

    const tempData = fs.readFileSync(
        `${__dirname}/../data/stocks.json`,
        'utf-8'
    );
    if (tempData !== '') {
        stocksData = JSON.parse(tempData);
    }

    let listOfStocks = origListOfStocks;

    listOfStocks = listOfStocks.slice(0, stocksData.length);

    listOfStocks.forEach((stock) => {
        if (shouldUpdate(stock)) {
            const change = Math.floor(Math.random() * 5);

            stocksData = stocksData.map((element) => {
                // console.log('initial stock', element);
                if (element.ticker === stock.ticker) {
                    if (Math.random() < 0.5) {
                        element.prices.o += change;
                    } else {
                        element.prices.o -= change;
                    }
                }
                return element;
            });

            fs.writeFileSync(
                `${__dirname}/../data/stocks.json`,
                JSON.stringify(stocksData)
            );
            console.log('data updated');
        } else {
            console.log('not updated');
        }
    });
};

const shouldUpdate = (stock) => {
    const currentTime = Number(Date.now());
    const lastUpdatedTime = getLastUpdatedTime(stock);
    const refreshInterval = stock.refreshInterval;
    const interval = currentTime - lastUpdatedTime;
    // console.log('interval', interval);
    return interval >= refreshInterval;
};

const getLastUpdatedTime = (stock) =>
    Number(Date.now()) - stock.refreshInterval;

// const hello = () => {
//     console.log('hello');
// };

// setInterval(hello, 1000);

module.exports = { updateStockData };
