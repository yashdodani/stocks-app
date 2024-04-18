import PropTypes from 'prop-types';

const Stock = ({ stock }) => {
    return (
        // <div>
        //     <strong>{stock.ticker}</strong>
        //     <p>{stock.prices.o}</p>
        //     <p>{stock.refreshInterval}</p>
        // </div>
        <div className="card" style={{ width: 18 + 'rem', margin: 2 + 'rem' }}>
            <div className="card-body">
                <h5 className="card-title">{stock.ticker}</h5>
                <h3 className="card-text">
                    <strong>${stock.prices.o}</strong>
                </h3>
                <p className="card-text">
                    Refreshes in every {stock.refreshInterval / 1000}s
                </p>
            </div>
        </div>
    );
};

Stock.propTypes = {
    stock: PropTypes.object.isRequired,
};

Stock.displayName = 'Stock';

export default Stock;
