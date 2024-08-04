import React, { useState } from 'react'

const FoodList = ({ foodItems, addToCart }) => {
    const [quantities, setQuantities] = useState({})

    const handleChange = (id, value) => {
        setQuantities({
            ...quantities,
            [id]: value,
        })
    }

    const handleIncrement = id => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: (prevQuantities[id] || 1) + 1,
        }))
    }

    const handleDecrement = id => {
        setQuantities(prevQuantities => {
            const currentValue = prevQuantities[id] || 1
            if (currentValue > 1) {
                return { ...prevQuantities, [id]: currentValue - 1 }
            }
            return prevQuantities
        })
    }

    return (
        <div className="food-list">
            {foodItems.map(item => (
                <div className="food-item" key={item.id}>
                    <img src={item.pictureUrl} alt={item.name} />
                    <h3>{item.name}</h3>
                    <p>Rp{item.price}</p>
                    <div className="number-input-container">
                        <button className="decrement" onClick={() => handleDecrement(item.id)}>
                            -
                        </button>
                        <input type="number" min="1" value={quantities[item.id] || 1} onChange={e => handleChange(item.id, e.target.value)} />
                        <button className="increment" onClick={() => handleIncrement(item.id)}>
                            +
                        </button>
                    </div>
                    <button onClick={() => addToCart(item, quantities[item.id] || 1)}>Add to Cart</button>
                </div>
            ))}
        </div>
    )
}

export default FoodList
