const { foodService } = require('../services')
const { validate } = require('../utils')
const { foodValidator } = require('../validators')

const foodController = routers => {
    let url = null

    url = '/food/save-food'
    routers.post(url, async (request, response) => {
        const errors = await validate(foodValidator)(request, response)
        if (errors)
            return response.json({
                isSuccess: false,
                status: 'ERROR',
                data: errors,
                message: 'Validation error!',
            })
        const food = request.body
        food.id = food.id ? food.id : null
        food.updatedBy = 'ANONYMOUS'
        return response.json(await foodService.saveFood(food))
    })

    url = '/food/delete-food'
    routers.get(url, async (request, response) => {
        const id = request.query.id ? request.query.id : null
        return response.json(await foodService.deleteFood(id))
    })

    url = '/food/get-foods'
    routers.get(url, async (request, response) => {
        return response.json(await foodService.getFoods())
    })

    url = '/food/get-food-by-id'
    routers.get(url, async (request, response) => {
        const id = request.query.id ? request.query.id : null
        return response.json(await foodService.getFoodById(id))
    })

    return routers
}

module.exports = foodController
