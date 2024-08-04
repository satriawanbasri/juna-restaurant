module.exports = (sequelize, DataTypes, Model) => {
    class Order extends Model {
        static associate(models) {}
    }
    Order.init(
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
            tableNumber: { type: DataTypes.INTEGER, allowNull: false },
            totalQuantity: { type: DataTypes.INTEGER, allowNull: false },
            totalPrice: { type: DataTypes.BIGINT, allowNull: false },
            status: { type: DataTypes.STRING(64), allowNull: false },
        },
        { sequelize }
    )
    return Order
}
