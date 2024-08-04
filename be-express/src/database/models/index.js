const clsHooked = require('cls-hooked')
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const namespace = clsHooked.createNamespace('mynamespace')
Sequelize.useCLS(namespace)
const config = {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,

    dialect: 'postgres',
    logging: false,
    define: { timestamps: false, freezeTableName: true },
}
const sequelize = new Sequelize(config.database, config.username, config.password, config)
const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize
const basename = path.basename(__filename)
fs.readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes, Sequelize.Model)
        db[model.name] = model
    })
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) db[modelName].associate(db)
})

db.OrderFood.belongsTo(db.Order, { as: 'order', onDelete: 'CASCADE' })
db.OrderFood.belongsTo(db.Food, { as: 'food', onDelete: 'CASCADE' })

module.exports = db
