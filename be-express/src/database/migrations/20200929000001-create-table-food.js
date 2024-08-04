module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('"Food"', {
            id: {
                type: DataTypes.STRING(64),
                allowNull: false,
                primaryKey: true,
            },
            createdOn: { type: DataTypes.DATE, allowNull: false },
            createdBy: { type: DataTypes.STRING(64), allowNull: false },
            updatedOn: { type: DataTypes.DATE, allowNull: false },
            updatedBy: { type: DataTypes.STRING(64), allowNull: false },
            name: { type: DataTypes.STRING(128), allowNull: false },
            pictureUrl: { type: DataTypes.STRING(512), allowNull: false },
            price: { type: DataTypes.BIGINT, allowNull: false },
        })
    },
    down: async (queryInterface, DataTypes) => {
        await queryInterface.dropTable('"Food"')
    },
}
