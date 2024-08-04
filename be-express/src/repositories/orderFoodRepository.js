const db = require('../database/models')

const orderFoodRepository = {}

orderFoodRepository.insertOrderFood = async orderFood => {
    return await db.OrderFood.create(orderFood)
}

orderFoodRepository.updateOrderFood = async orderFood => {
    return await db.OrderFood.update(orderFood, { where: { id: orderFood.id } })
}

orderFoodRepository.deleteOrderFood = async id => {
    return await db.OrderFood.destroy({ where: { id } })
}

orderFoodRepository.getOrderFoods = async () => {
    return await db.OrderFood.findAll({ raw: true, orderFood: [['updatedOn', 'DESC']] })
}

orderFoodRepository.getOrderFoodById = async id => {
    return await db.OrderFood.findOne({ raw: true, where: { id } })
}

orderFoodRepository.getOrderFoodByCode = async code => {
    return await db.OrderFood.findOne({ raw: true, where: { code } })
}

orderFoodRepository.getOrderFoodsByOrderId = async orderId => {
    return await db.OrderFood.findAll({
        raw: true,
        nest: true,
        include: [{ model: db.Food, as: 'food' }],
        where: { orderId },
    })
}

module.exports = orderFoodRepository
