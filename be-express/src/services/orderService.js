const { v4: uuid } = require('uuid')

const { orderRepository } = require('../repositories')
const { logger } = require('../utils')

const orderService = {}

orderService.saveOrder = async order => {
    try {
        const orderExist = await orderRepository.getOrderById(order.id)
        if (!orderExist) {
            if (!order.id) order.id = uuid()
            order.createdBy = order.updatedBy
            order.createdOn = new Date()
            order.updatedOn = new Date()
            if (await orderRepository.insertOrder(order))
                return {
                    isSuccess: true,
                    status: 'SUCCESS',
                    message: 'Order has been saved successfully!',
                }
            else
                return {
                    isSuccess: false,
                    status: 'ERROR',
                    message: 'Failed saving Order!',
                }
        } else {
            order.createdBy = orderExist.createdBy
            order.createdOn = orderExist.createdOn
            order.updatedOn = new Date()
            if (await orderRepository.updateOrder(order))
                return {
                    isSuccess: true,
                    status: 'SUCCESS',
                    message: 'Order has been updated successfully!',
                }
            else
                return {
                    isSuccess: false,
                    status: 'SUCCESS',
                    message: 'Failed saving Order!',
                }
        }
    } catch (error) {
        logger.error(error)
        return {
            isSuccess: false,
            status: 'ERROR',
            data: error,
            message: 'Failed saving Order!',
        }
    }
}

orderService.deleteOrder = async id => {
    try {
        if (await orderRepository.deleteOrder(id))
            return {
                isSuccess: true,
                status: 'SUCCESS',
                message: 'Order has been deleted successfully!',
            }
        else
            return {
                isSuccess: false,
                status: 'ERROR',
                message: 'Failed delete Order!',
            }
    } catch (error) {
        logger.error(error)
        return {
            isSuccess: false,
            status: 'ERROR',
            data: error,
            message: 'Failed deleting Order!',
        }
    }
}

orderService.getOrders = async () => {
    try {
        const orders = await orderRepository.getOrders()
        return {
            isSuccess: true,
            status: 'SUCCESS',
            data: orders,
            message: 'Succeeded getting Orders!',
        }
    } catch (error) {
        logger.error(error)
        return {
            isSuccess: false,
            status: 'ERROR',
            data: error,
            message: 'Failed getting Orders!',
        }
    }
}

orderService.getOrderById = async id => {
    try {
        const order = await orderRepository.getOrderById(id)
        return {
            isSuccess: true,
            status: 'SUCCESS',
            data: order,
            message: 'Succeeded getting Order by ID!',
        }
    } catch (error) {
        logger.error(error)
        return {
            isSuccess: false,
            status: 'ERROR',
            data: error,
            message: 'Failed getting Order by ID!',
        }
    }
}

module.exports = orderService
