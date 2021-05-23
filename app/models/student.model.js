module.exports = (sequelize, Sequelize, DataTypes) => {
    const Student = sequelize.define(
        'student',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            idUser: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            birthday: {
                type: DataTypes.STRING,
                allowNull: false
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            code: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            idClass: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            majors: {
                type: DataTypes.STRING,
            },
            schoolYear: {
                type: DataTypes.STRING,
            },
            image: {
                type: DataTypes.STRING,
            }
        },
        {
            timestamps: true,
            underscrored: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );
    return Student;
}