import { useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import Stock from './Stock';

const base_url = 'http://localhost:8001';

// initialize socket.io
const socket = io(base_url);

function App() {
    const [number, setNumber] = useState('');
    const [stocks, setStocks] = useState([]);

    const getStocks = async (event) => {
        event.preventDefault();

        if (number > 5 || number < 1) {
            alert('Please enter a number between 1 and 5');
            setNumber('');
            return;
        }

        // fetch data
        const response = await axios.get(`${base_url}/api/stocks/${number}`);

        // set stocks if file changes
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
        <div className="container">
            <form onSubmit={getStocks}>
                <legend>Enter number of stocks:</legend>
                <div className="mb-3">
                    <input
                        type="text"
                        value={number}
                        name="Number"
                        className="form-control"
                        onChange={({ target }) => setNumber(target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Show
                </button>
            </form>

            <br />
            <button className="btn btn-dark" onClick={handleRestart}>
                Restart
            </button>

            <div style={{ marginTop: 2 + 'rem' }}>
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
