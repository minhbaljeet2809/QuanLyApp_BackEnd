module.exports = (sequelize, Sequelize, DataTypes) => {
    const Class = sequelize.define(
        'class',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING
            }
        }, {
        timestamps: true,
        underscrored: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
    );
    return Class;

}