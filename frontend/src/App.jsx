import { useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import Stock from './Stock';

const base_url = 'http://localhost:8001';

const socket = io(base_url);

function App() {
    const [number, setNumber] = useState('');
    const [stocks, setStocks] = useState([]);

    // console.log(stocks.length);

    const getStocks = async (event) => {
        event.preventDefault();
        const response = await axios.get(`${base_url}/api/stocks/${number}`);

        socket.on('filechange', (response) => {
            setStocks(response.data);
        });

        setStocks(response.data);
        setNumber('');
    };

    const handleRestart = () => {
        socket.emit('restart');
    };

    return (
        <div>
            <h3>Enter number of stocks to show: </h3>
            <form onSubmit={getStocks}>
                <div>
                    <input
                        type="text"
                        value={number}
                        name="Number"
                        onChange={({ target }) => setNumber(target.value)}
                    />
                </div>
                <button type="submit">Show</button>
            </form>
            <div>
                <ul>
                    {stocks.map((stock) => (
                        <Stock key={stock.id} stock={stock} />
                    ))}
                </ul>
            </div>

            <button onClick={handleRestart}>Restart</button>
        </div>
    );
}

export default App;
