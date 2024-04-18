import { useState } from 'react';
import axios from 'axios';

const base_url = '/api/stocks';

function App() {
    const [number, setNumber] = useState('');
    const [stocks, setStocks] = useState([]);

    console.log(stocks.length);

    const getStocks = async (event) => {
        event.preventDefault();
        const response = await axios.get(`${base_url}/${number}`);
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
                        <li key={stock.request_id}>{stock.ticker}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
