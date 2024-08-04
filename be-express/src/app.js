const bodyParser = require('body-parser')
const express = require('express')
const expressFileUpload = require('express-fileupload')
const helmet = require('helmet')

const routers = require('./controllers')

const app = () => {
    const app = express()
    app.use(helmet())
    app.use(bodyParser.json({ limit: '50mb' }))
    app.use(expressFileUpload())
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*')
        response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
        next()
    })
    app.use('/', routers)
    app.listen(8083, () => {
        console.log(`Web server started on port 8083`)
    })
}

module.exports = app
