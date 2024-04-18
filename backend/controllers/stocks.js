const stocks = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/stocks.json`)
);

console.log(stocks);
