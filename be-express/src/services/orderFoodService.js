const { v4: uuid } = require('uuid')

const { orderFoodRepository } = require('../repositories')
const { logger } = require('../utils')

const orderFoodService = {}

orderFoodService.saveOrderFood = async orderFood => {
    try {
        const orderFoodExist = await orderFoodRepository.getOrderFoodById(orderFood.id)
        if (!orderFoodExist) {
            if (!orderFood.id) orderFood.id = uuid()
            orderFood.createdBy = orderFood.updatedBy
            orderFood.createdOn = new Date()
            orderFood.updatedOn = new Date()
            if (await orderFoodRepository.insertOrderFood(orderFood))
                return {
                    isSuccess: true,
                    status: 'SUCCESS',
                    message: 'OrderFood has been saved successfully!',
                }
            else
                return {
                    isSuccess: false,
                    status: 'ERROR',
                    message: 'Failed saving OrderFood!',
                }
        } else {
            orderFood.createdBy = orderFoodExist.createdBy
            orderFood.createdOn = orderFoodExist.createdOn
            orderFood.updatedOn = new Date()
            if (await orderFoodRepository.updateOrderFood(orderFood))
                return {
                    isSuccess: true,
                    status: 'SUCCESS',
                    message: 'OrderFood has been updated successfully!',
                }
            else
                return {
                    isSuccess: false,
                    status: 'SUCCESS',
                    message: 'Failed saving OrderFood!',
                }
        }
    } catch (error) {
        logger.error(error)
        return {
            isSuccess: false,
            status: 'ERROR',
            data: error,
            message: 'Failed saving OrderFood!',
        }
    }
}

orderFoodService.deleteOrderFood = async id => {
    try {
        if (await orderFoodRepository.deleteOrderFood(id))
            return {
                isSuccess: true,
                status: 'SUCCESS',
                message: 'OrderFood has been deleted successfully!',
            }
        else
            return {
                isSuccess: false,
                status: 'ERROR',
                message: 'Failed delete OrderFood!',
            }
    } catch (error) {
        logger.error(error)
        return {
            isSuccess: false,
            status: 'ERROR',
            data: error,
            message: 'Failed deleting OrderFood!',
        }
    }
}

orderFoodService.getOrderFoods = async () => {
    try {
        const orderFoods = await orderFoodRepository.getOrderFoods()
        return {
            isSuccess: true,
            status: 'SUCCESS',
            data: orderFoods,
            message: 'Succeeded getting OrderFoods!',
        }
    } catch (error) {
        logger.error(error)
        return {
            isSuccess: false,
            status: 'ERROR',
            data: error,
            message: 'Failed getting OrderFoods!',
        }
    }
}

orderFoodService.getOrderFoodById = async id => {
    try {
        const orderFood = await orderFoodRepository.getOrderFoodById(id)
        return {
            isSuccess: true,
            status: 'SUCCESS',
            data: orderFood,
            message: 'Succeeded getting OrderFood by ID!',
        }
    } catch (error) {
        logger.error(error)
        return {
            isSuccess: false,
            status: 'ERROR',
            data: error,
            message: 'Failed getting OrderFood by ID!',
        }
    }
}

orderFoodService.getOrderFoodsByOrderId = async orderId => {
    try {
        const orderFood = await orderFoodRepository.getOrderFoodsByOrderId(orderId)
        return {
            isSuccess: true,
            status: 'SUCCESS',
            data: orderFood,
            message: 'Succeeded getting OrderFoods by Order ID!',
        }
    } catch (error) {
        logger.error(error)
        return {
            isSuccess: false,
            status: 'ERROR',
            data: error,
            message: 'Failed getting OrderFoods by Order ID!',
        }
    }
}

module.exports = orderFoodService
