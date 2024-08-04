const express = require('express')

const foodController = require('./foodController')
const orderController = require('./orderController')

let routers = express.Router()

routers = foodController(routers)
routers = orderController(routers)

module.exports = routers
