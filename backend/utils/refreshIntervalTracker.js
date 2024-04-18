const fs = require('fs');
let listOfStocks = require('./tickers');

let stocksData = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/stocks.json`)
);

const updateStockData = () => {
    console.log('Updating data....');
    listOfStocks = listOfStocks.slice(0, stocksData.length);
    listOfStocks.forEach((stock) => {
        if (shouldUpdate(stock)) {
            // console.log(`update stock data for ${stock.ticker}`);
            const change = Math.floor(Math.random() * 5);

            stocksData = stocksData.map((element) => {
                // console.log('initial stock', element);
                if (element.ticker === stock.ticker) {
                    element.prices.o += change;
                }
                return element;
            });

            fs.writeFileSync(
                `${__dirname}/../data/stocks.json`,
                JSON.stringify(stocksData)
            );
            // console.log('data updated');
        } else {
            console.log('not updated');
        }
    });
};

const shouldUpdate = (stock) => {
    const currentTime = Date.now();
    const lastUpdatedTime = getLastUpdatedTime(stock);
    const refreshInterval = stock.refreshInterval;
    const interval = currentTime - lastUpdatedTime;
    // console.log('interval', interval);
    return interval >= refreshInterval;
};

const getLastUpdatedTime = (stock) => {
    // console.log('refreshInterval', stock.refreshInterval);
    const r = Number(Date.now()) - stock.refreshInterval;
    // console.log(r);
    return r;
};

// const hello = () => {
//     console.log('hello');
// };

// setInterval(hello, 1000);

module.exports = { updateStockData };
