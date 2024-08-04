const log4js = require('log4js')

log4js.configure({
    appenders: { error: { type: 'file', filename: 'error.log' } },
    categories: { default: { appenders: ['error'], level: 'trace' } },
})

const logger = log4js.getLogger('log')

module.exports = logger
