import { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import Stock from './Stock';

const base_url = 'http://localhost:8001';

// initialize socket.io
const socket = io(base_url);

function App() {
    const [number, setNumber] = useState('');
    const [stocks, setStocks] = useState([]);
    const [numberOfCalls, setNumberOfCalls] = useState(0);

    useEffect(() => {
        const numberOfCallsTrue = window.localStorage.getItem('numberOfCalls');

        numberOfCallsTrue === null
            ? setNumberOfCalls(0)
            : setNumberOfCalls(Number(numberOfCallsTrue));
    }, []);

    const getStocks = async (event) => {
        event.preventDefault();

        if (number > 5 || number < 1) {
            alert('Please enter a number between 1 and 5');
            setNumber('');
            return;
        }

        window.localStorage.setItem(
            'numberOfCalls',
            numberOfCalls + Number(number)
        );
        setNumberOfCalls(numberOfCalls + Number(number));

        if (Number(window.localStorage.getItem('numberOfCalls')) > 5) {
            alert('please wait for some time before sending request again');
            return;
        }

        setTimeout(() => {
            window.localStorage.setItem('numberOfCalls', 0);
            setNumberOfCalls(0);
        }, 65000);

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
            {/* {stocks.length === 0 ? (
            ) : (
            )} */}
            <form onSubmit={getStocks}>
                <legend>Enter number of stocks:</legend>
                <div className="mb-3">
                    <input
                        type="text"
                        value={number}
                        name="Number"
                        className="form-control"
                        onChange={({ target }) => {
                            setNumber(target.value);
                        }}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Show
                </button>
            </form>
            <button
                className="btn btn-dark"
                onClick={handleRestart}
                style={{ marginTop: 1 + 'rem' }}
            >
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
