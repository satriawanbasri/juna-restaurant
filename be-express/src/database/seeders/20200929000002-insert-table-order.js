module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('"Order"', [
            {
                id: 'b243f74c-a634-45a0-bff4-21293a0e2325',
                createdOn: new Date(),
                createdBy: 'SEEDER',
                updatedOn: new Date(),
                updatedBy: 'SEEDER',
                tableNumber: 2,
                totalQuantity: 5,
                totalPrice: 76000,
                status: 'Waiting',
            },
            {
                id: '6441d4c9-6f42-43f5-80de-4c55e29fd6e4',
                createdOn: new Date(),
                createdBy: 'SEEDER',
                updatedOn: new Date(),
                updatedBy: 'SEEDER',
                tableNumber: 5,
                totalQuantity: 3,
                totalPrice: 70000,
                status: 'Served',
            },
        ])
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('"Order"', null, {})
    },
}
