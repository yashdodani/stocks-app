import PropTypes from 'prop-types';

const Stock = ({ stock }) => {
    return (
        <div>
            <strong>{stock.ticker}</strong>
            <p>{stock.prices.o}</p>
            <p>{stock.refreshInterval}</p>
        </div>
    );
};

Stock.propTypes = {
    stock: PropTypes.object.isRequired,
};

Stock.displayName = 'Stock';

export default Stock;
