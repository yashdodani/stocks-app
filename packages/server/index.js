const { createServer } = require('node:http');
const { Server } = require('socket.io');
const fs = require('fs');

const app = require('./app');
const { updateStockData } = require('./utils/refreshIntervalTracker');

let stocksData;

// Socket.io
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
    },
});

io.on('connection', (socket) => {
    console.log('a user connected');

    // check for file changes 'stocks.json'
    fs.watchFile(
        `${__dirname}/data/stocks.json`,
        {
            persistent: true,
            interval: 1000,
        },
        (data) => {
            stocksData = [];

            const tempData = fs.readFileSync(
                `${__dirname}/data/stocks.json`,
                'utf-8'
            );
            if (tempData !== '') {
                stocksData = JSON.parse(tempData);
            }
            io.emit('filechange', { data: stocksData });
        }
    );

    socket.on('disconnect', () => {
        console.log('user disconnected');
        fs.writeFileSync(`${__dirname}/data/stocks.json`, '');
    });

    // deletes data in 'stocks.json' to start again
    socket.on('restart', () => {
        stocksData = '';
        fs.writeFileSync(`${__dirname}/data/stocks.json`, stocksData);
        console.log('data removed');
    });
});

// Refresh Data every second
setInterval(updateStockData, 1000);

const PORT = 8001;
server.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
    fs.writeFileSync(`${__dirname}/data/stocks.json`, '');
});
