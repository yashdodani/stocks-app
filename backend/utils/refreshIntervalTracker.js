const fs = require('fs');
let origListOfStocksObj = require('./tickers');

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

    if (stocksData.length === 0) {
        return;
    }

    const tempStocksData = stocksData;

    tempStocksData.forEach((iterateStockObj) => {
        if (shouldUpdate(iterateStockObj)) {
            stocksData = stocksData.map((stock) => {
                const change = Math.floor(Math.random() * 3 + 1);

                if (stock.ticker === iterateStockObj.ticker) {
                    Math.random() < 0.5
                        ? (stock.prices.o += change)
                        : (stock.prices.o -= change);

                    stock.lastUpdatedAt = Date.now();
                }

                return stock;
            });

            fs.writeFileSync(
                `${__dirname}/../data/stocks.json`,
                JSON.stringify(stocksData)
            );

            console.log(`data updated for ${iterateStockObj.ticker}`);
        }
    });
};

const shouldUpdate = (stock) => {
    const interval = Date.now() - stock.lastUpdatedAt;
    console.log(`interval for ${stock.ticker}`, interval);
    return interval >= stock.refreshInterval;
};

module.exports = { updateStockData };
