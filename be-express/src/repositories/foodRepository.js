const db = require('../database/models')

const foodRepository = {}

foodRepository.insertFood = async food => {
    return await db.Food.create(food)
}

foodRepository.updateFood = async food => {
    return await db.Food.update(food, { where: { id: food.id } })
}

foodRepository.deleteFood = async id => {
    return await db.Food.destroy({ where: { id } })
}

foodRepository.getFoods = async () => {
    return await db.Food.findAll({ raw: true, order: [['updatedOn', 'DESC']] })
}

foodRepository.getFoodById = async id => {
    return await db.Food.findOne({ raw: true, where: { id } })
}

foodRepository.getFoodByCode = async code => {
    return await db.Food.findOne({ raw: true, where: { code } })
}

module.exports = foodRepository
