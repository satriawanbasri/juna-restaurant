module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable(
            '"OrderFood"',
            {
                id: {
                    type: DataTypes.STRING(64),
                    allowNull: false,
                    primaryKey: true,
                },
                createdOn: { type: DataTypes.DATE, allowNull: false },
                createdBy: { type: DataTypes.STRING(64), allowNull: false },
                updatedOn: { type: DataTypes.DATE, allowNull: false },
                updatedBy: { type: DataTypes.STRING(64), allowNull: false },
                orderId: {
                    type: DataTypes.STRING(64),
                    allowNull: false,
                    onDelete: 'CASCADE',
                    references: {
                        model: { tableName: '"Order"' },
                        key: '"id"',
                    },
                    unique: '"uniqueTag_OrderFood_orderId_foodId"',
                },
                foodId: {
                    type: DataTypes.STRING(64),
                    allowNull: false,
                    onDelete: 'CASCADE',
                    references: {
                        model: { tableName: '"Food"' },
                        key: '"id"',
                    },
                    unique: '"uniqueTag_OrderFood_orderId_foodId"',
                },
                quantity: { type: DataTypes.INTEGER, allowNull: false },
                price: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                },
                subTotalPrice: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                },
            },
            {
                uniqueKeys: {
                    uniqueTag_OrderFood_orderId_foodId: {
                        customIndex: true,
                        fields: ['"orderId"', '"foodId"'],
                    },
                },
            }
        )
    },
    down: async (queryInterface, DataTypes) => {
        await queryInterface.dropTable('"OrderFood"')
    },
}
