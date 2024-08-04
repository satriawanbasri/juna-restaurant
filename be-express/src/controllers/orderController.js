const { v4: uuid } = require('uuid')

const { orderFoodService, orderService } = require('../services')
const { validate } = require('../utils')
const { orderValidator } = require('../validators')

const orderController = routers => {
    let url = null

    url = '/order/save-order'
    routers.post(url, async (request, response) => {
        const errors = await validate(orderValidator)(request, response)
        if (errors)
            return response.json({
                isSuccess: false,
                status: 'ERROR',
                data: errors,
                message: 'Validation error!',
            })
        const order = request.body
        order.id = order.id ? order.id : null
        order.updatedBy = 'ANONYMOUS'
        return response.json(await orderService.saveOrder(order))
    })

    url = '/order/delete-order'
    routers.get(url, async (request, response) => {
        const id = request.query.id ? request.query.id : null
        return response.json(await orderService.deleteOrder(id))
    })

    url = '/order/get-orders'
    routers.get(url, async (request, response) => {
        return response.json(await orderService.getOrders())
    })

    url = '/order/get-order-by-id'
    routers.get(url, async (request, response) => {
        const id = request.query.id ? request.query.id : null
        return response.json(await orderService.getOrderById(id))
    })

    url = '/order/update-order-status'
    routers.get(url, async (request, response) => {
        const id = request.query.id ? request.query.id : null
        const result = await orderService.getOrderById(id)
        if (result.isSuccess) {
            const order = result.data
            order.updatedBy = 'ANONYMOUS'
            order.status = 'Served'
            return response.json(await orderService.saveOrder(order))
        } else return response.json(result)
    })

    url = '/order/get-view-order'
    routers.get(url, async (request, response) => {
        const orderId = request.query.order_id ? request.query.order_id : null
        return response.json(await orderFoodService.getOrderFoodsByOrderId(orderId))
    })

    url = '/order/submit-order'
    routers.post(url, async (request, response) => {
        const orderCart = request.body

        if (!orderCart || !orderCart.foods || orderCart.foods.length == 0 || orderCart.tableNumber == 0)
            return response.json({
                isSuccess: false,
                status: 'ERROR',
                message: 'Validation error!',
            })

        const orderId = uuid()

        let totalQuantity = 0
        let totalPrice = 0
        const orderFoods = []
        for (const food of orderCart.foods) {
            const orderFood = {}
            orderFood.id = orderFood.id ? orderFood.id : null
            orderFood.updatedBy = 'ANONYMOUS'
            orderFood.orderId = orderId
            orderFood.foodId = food.id
            orderFood.quantity = food.quantity
            orderFood.price = food.price
            orderFood.subTotalPrice = food.quantity * food.price
            orderFoods.push(orderFood)

            totalQuantity = totalQuantity + orderFood.quantity
            totalPrice = totalPrice + orderFood.subTotalPrice
        }

        if (totalPrice == 0)
            return response.json({
                isSuccess: false,
                status: 'WARNING',
                message: 'You must order some food!',
            })

        const order = {}
        order.id = orderId
        order.updatedBy = 'ANONYMOUS'
        order.tableNumber = orderCart.tableNumber
        order.totalQuantity = totalQuantity
        order.totalPrice = totalPrice
        order.status = 'Waiting'
        await orderService.saveOrder(order)

        for (const orderFood of orderFoods) await orderFoodService.saveOrderFood(orderFood)

        return response.json({
            isSuccess: true,
            status: 'SUCCESS',
            message: 'Your order has been submitted successfully, please wait!',
        })
    })

    return routers
}

module.exports = orderController
