module.exports = (sequelize, Sequelize, DataTypes) => {
    const Class = sequelize.define(
        'class',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            idTeacher: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            name: {
                type: DataTypes.STRING
            },
            teacher: {
                type: DataTypes.STRING
            }
        },{
            timestamps: true,
            underscrored: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );
    return Class;

}