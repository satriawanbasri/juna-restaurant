import React, { useEffect, useState } from 'react'
import './index.css'
import FoodList from './components/FoodList'
import CartDetail from './components/CartDetail'
import FloatingButton from './components/FloatingButton'
import { connect } from 'react-redux'
import actions from '../../store/actions'
import { fetch } from '../../utils'

const Home = props => {
    const [cart, setCart] = useState([])
    const [tableNumber, setTableNumber] = useState(0)
    const [foodItems, setFoodItems] = useState([])

    useEffect(() => {
        getFoods()

        props.setIsUsingLayout(false)
        return () => {
            props.setIsUsingLayout(true)
        }
    }, [])

    const getFoods = async () => {
        props.setIsShowProgressBar(true)
        const result = await fetch(null, process.env.REACT_APP_API_BASE_URL, '/food/get-foods')
        props.setIsShowProgressBar(false)
        if (result.isSuccess) {
            const foods = result.data
            if (foods) setFoodItems(foods)
        } else props.setMessageBox({ ...result, isShow: true })
    }

    const addToCart = (item, quantity) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(i => i.id === item.id)
            if (existingItem) {
                return prevCart.map(i => (i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i))
            } else {
                return [...prevCart, { ...item, quantity }]
            }
        })
    }

    const updateQuantity = (item, quantity) => {
        setCart(prevCart => {
            return prevCart.map(i => (i.id === item.id ? { ...i, quantity: parseInt(quantity, 10) } : i))
        })
    }

    const submitOrder = async () => {
        if (!cart || cart.length == 0) {
            props.setMessageBox({
                isShow: true,
                status: 'WARNING',
                message: 'Please select some food!',
            })
            return
        }

        if (tableNumber == 0) {
            props.setMessageBox({
                isShow: true,
                status: 'WARNING',
                message: 'Please select your table number!',
            })
            return
        }

        const orderCart = {}
        orderCart.foods = cart
        orderCart.tableNumber = tableNumber
        props.setIsShowProgressBar(true)
        const result = await fetch(null, process.env.REACT_APP_API_BASE_URL, '/order/submit-order', orderCart)
        props.setIsShowProgressBar(false)
        setCart([])
        setTableNumber(0)
        props.setMessageBox({ ...result, isShow: true })
    }

    return (
        <div className="app-container">
            <div className="header">
                <img src="juna-icon-large.png" className="juna-icon" />
                <h1>Juna Restaurant</h1>
            </div>
            <FoodList foodItems={foodItems} addToCart={addToCart} />
            <CartDetail
                cartItems={cart}
                tableNumber={tableNumber}
                setTableNumber={setTableNumber}
                updateQuantity={updateQuantity}
                submitOrder={submitOrder}
            />
            <FloatingButton />
        </div>
    )
}

export default connect(
    state => {
        const { sessionReducer } = state
        return { ...sessionReducer }
    },
    { ...actions.sessionAction }
)(Home)
