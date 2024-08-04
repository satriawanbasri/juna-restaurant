module.exports = (sequelize, DataTypes, Model) => {
    class Food extends Model {
        static associate(models) {}
    }
    Food.init(
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
            name: {
                type: DataTypes.STRING(128),
                allowNull: false,
            },
            pictureUrl: {
                type: DataTypes.STRING(512),
                allowNull: false,
            },
            price: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
        },
        { sequelize }
    )
    return Food
}
