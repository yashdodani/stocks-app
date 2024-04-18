import { useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import Stock from './Stock';

const base_url = 'http://localhost:8001/api/stocks';

const socket = io('http://localhost:8001');

function App() {
    const [number, setNumber] = useState('');
    const [stocks, setStocks] = useState([]);

    socket.on('filechange', (response) => {
        setStocks(response.data);
    });

    // console.log(stocks.length);

    const getStocks = async (event) => {
        event.preventDefault();
        const dataObj = { numberOfTickers: number };
        const response = await axios.post(base_url, dataObj);
        console.log(response);
        setStocks(response.data);
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
        </div>
    );
}

export default App;
