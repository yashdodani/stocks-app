const { createServer } = require('node:http');
const { Server } = require('socket.io');
const fs = require('fs');

const app = require('./app');
const { updateStockData } = require('./utils/refreshIntervalTracker');

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
    },
});

// Refresh interval file update
setInterval(updateStockData, 1000);

io.on('connection', (socket) => {
    console.log('a user connected');
    fs.watchFile(
        `${__dirname}/data/stocks.json`,
        {
            persistent: true,
            interval: 1000,
        },
        (data) => {
            console.log('file changed log');
            const stocksData = JSON.parse(
                fs.readFileSync(`${__dirname}/data/stocks.json`)
            );
            io.emit('filechange', { data: stocksData });
        }
    );
});

const PORT = 8001;
server.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
