/* eslint-disable react/prop-types */
const Stock = ({ stock }) => {
    return (
        <div>
            <h4>{stock.ticker}</h4>
            <p>{stock.prices.o}</p>
        </div>
    );
};

export default Stock;
