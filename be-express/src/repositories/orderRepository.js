const db = require('../database/models')

const orderRepository = {}

orderRepository.insertOrder = async order => {
    return await db.Order.create(order)
}

orderRepository.updateOrder = async order => {
    return await db.Order.update(order, { where: { id: order.id } })
}

orderRepository.deleteOrder = async id => {
    return await db.Order.destroy({ where: { id } })
}

orderRepository.getOrders = async () => {
    return await db.Order.findAll({ raw: true, order: [['updatedOn', 'DESC']] })
}

orderRepository.getOrderById = async id => {
    return await db.Order.findOne({ raw: true, where: { id } })
}

orderRepository.getOrderByCode = async code => {
    return await db.Order.findOne({ raw: true, where: { code } })
}

module.exports = orderRepository
