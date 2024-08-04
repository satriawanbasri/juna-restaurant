import React from 'react'

const CartDetail = ({ cartItems, tableNumber, setTableNumber, updateQuantity, submitOrder }) => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

    const tables = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    const handleIncrement = item => {
        updateQuantity(item, item.quantity + 1)
    }

    const handleDecrement = item => {
        if (item.quantity > 0) {
            updateQuantity(item, item.quantity - 1)
        }
    }

    const handleChange = e => {
        setTableNumber(e.target.value)
    }

    return (
        <div className="cart-detail">
            <h2>Cart Details</h2>
            {cartItems.map(item => (
                <div className="cart-item" key={item.id}>
                    <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <p>Rp{item.price}</p>
                        <p className="subtotal">Subtotal: Rp{item.price * item.quantity}</p>
                    </div>
                    <div className="number-input-container">
                        <button className="decrement" onClick={() => handleDecrement(item)}>
                            -
                        </button>
                        <input type="number" min="0" value={item.quantity} onChange={e => updateQuantity(item, e.target.value)} />
                        <button className="increment" onClick={() => handleIncrement(item)}>
                            +
                        </button>
                    </div>
                </div>
            ))}
            <h3>Total: Rp{total}</h3>
            <div className="select-container">
                <label htmlFor="selectOptions" className="select-label">
                    Select Table Number:
                </label>
                <select id="selectOptions" value={tableNumber} onChange={handleChange} className="select-dropdown">
                    {tables.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>
            <button onClick={submitOrder}>Submit Order</button>
        </div>
    )
}

export default CartDetail
