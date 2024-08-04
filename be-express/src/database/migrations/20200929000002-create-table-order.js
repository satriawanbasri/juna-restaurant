module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('"Order"', {
            id: {
                type: DataTypes.STRING(64),
                allowNull: false,
                primaryKey: true,
            },
            createdOn: { type: DataTypes.DATE, allowNull: false },
            createdBy: { type: DataTypes.STRING(64), allowNull: false },
            updatedOn: { type: DataTypes.DATE, allowNull: false },
            updatedBy: { type: DataTypes.STRING(64), allowNull: false },
            tableNumber: { type: DataTypes.INTEGER, allowNull: false },
            totalQuantity: { type: DataTypes.INTEGER, allowNull: false },
            totalPrice: { type: DataTypes.BIGINT, allowNull: false },
            status: { type: DataTypes.STRING(64), allowNull: false },
        })
    },
    down: async (queryInterface, DataTypes) => {
        await queryInterface.dropTable('"Order"')
    },
}
