const fs = require('fs');

let stocksData;

const updateStockData = () => {
    console.log('Refreshing...');
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

    // nested loop, to check if stock should be updated, if yes find it and update it.
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
        }
    });
};

// check if time more than refreshInterval has passed.
const shouldUpdate = (stock) => {
    const interval = Date.now() - stock.lastUpdatedAt;
    return interval >= stock.refreshInterval;
};

module.exports = { updateStockData };
