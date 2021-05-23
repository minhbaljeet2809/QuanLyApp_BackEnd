module.exports = (sequelize, Sequelize, DataTypes) => {
    const Teacher = sequelize.define(
        'teacher',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            level: {
                type: DataTypes.STRING(30),
                allowNull: false
            },
            birthday: {
                type: DataTypes.STRING,
                allowNull: true
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING,
            },
            image: {
                type: DataTypes.STRING,
            },
            workspace: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.STRING,
            }

        }
        ,
        {
            // Options
            timestamps: true,
            underscrored: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );

    return Teacher;
}