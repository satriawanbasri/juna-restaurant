module.exports = (sequelize, DataTypes, Model) => {
    class OrderFood extends Model {
        static associate(models) {}
    }
    OrderFood.init(
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
            },
            foodId: {
                type: DataTypes.STRING(64),
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: { tableName: '"Food"' },
                    key: '"id"',
                },
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
        { sequelize, indexes: [{ unique: true, fields: ['"orderId"', '"foodId"'] }] }
    )
    return OrderFood
}
