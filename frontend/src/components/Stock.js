import { FaTimes } from 'react-icons/fa'

const Stock = ({ stock, onDelete }) => {
    return (
        <div className="stock">
            <div className="b">
                {stock.symbol}
            </div>
            <div className="b">
                {stock.name}
            </div>
            <div className="b">
                {stock.price}
            </div>
            <div className="b">
                <FaTimes style={{ color:'red', cursor:'pointer'}} onClick={() => onDelete(stock) } />
            </div>
        </div>
    )
}

export default Stock
