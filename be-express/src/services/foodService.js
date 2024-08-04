const { v4: uuid } = require('uuid')

const { foodRepository } = require('../repositories')
const { logger } = require('../utils')

const foodService = {}

foodService.saveFood = async food => {
    try {
        const foodExist = await foodRepository.getFoodById(food.id)
        if (!foodExist) {
            if (!food.id) food.id = uuid()
            food.createdBy = food.updatedBy
            food.createdOn = new Date()
            food.updatedOn = new Date()
            if (await foodRepository.insertFood(food))
                return {
                    isSuccess: true,
                    status: 'SUCCESS',
                    message: 'Food has been saved successfully!',
                }
            else
                return {
                    isSuccess: false,
                    status: 'ERROR',
                    message: 'Failed saving Food!',
                }
        } else {
            food.createdBy = foodExist.createdBy
            food.createdOn = foodExist.createdOn
            food.updatedOn = new Date()
            if (await foodRepository.updateFood(food))
                return {
                    isSuccess: true,
                    status: 'SUCCESS',
                    message: 'Food has been updated successfully!',
                }
            else
                return {
                    isSuccess: false,
                    status: 'SUCCESS',
                    message: 'Failed saving Food!',
                }
        }
    } catch (error) {
        logger.error(error)
        return {
            isSuccess: false,
            status: 'ERROR',
            data: error,
            message: 'Failed saving Food!',
        }
    }
}

foodService.deleteFood = async id => {
    try {
        if (await foodRepository.deleteFood(id))
            return {
                isSuccess: true,
                status: 'SUCCESS',
                message: 'Food has been deleted successfully!',
            }
        else
            return {
                isSuccess: false,
                status: 'ERROR',
                message: 'Failed delete Food!',
            }
    } catch (error) {
        logger.error(error)
        return {
            isSuccess: false,
            status: 'ERROR',
            data: error,
            message: 'Failed deleting Food!',
        }
    }
}

foodService.getFoods = async () => {
    try {
        const foods = await foodRepository.getFoods()
        return {
            isSuccess: true,
            status: 'SUCCESS',
            data: foods,
            message: 'Succeeded getting Foods!',
        }
    } catch (error) {
        logger.error(error)
        return {
            isSuccess: false,
            status: 'ERROR',
            data: error,
            message: 'Failed getting Foods!',
        }
    }
}

foodService.getFoodById = async id => {
    try {
        const food = await foodRepository.getFoodById(id)
        return {
            isSuccess: true,
            status: 'SUCCESS',
            data: food,
            message: 'Succeeded getting Food by ID!',
        }
    } catch (error) {
        logger.error(error)
        return {
            isSuccess: false,
            status: 'ERROR',
            data: error,
            message: 'Failed getting Food by ID!',
        }
    }
}

module.exports = foodService
