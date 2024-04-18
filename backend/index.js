const app = require('./app');
const { updateStockData } = require('./utils/refreshIntervalTracker');

setInterval(updateStockData, 1000);

const PORT = 8001;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
