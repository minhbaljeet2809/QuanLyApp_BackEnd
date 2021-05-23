module.exports = (sequelize, Sequelize, DataTypes) => {
    const Project = sequelize.define(
        `project`,
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
            projectRequest: {
                type: DataTypes.STRING,
                allowNull: false
            },
            projectContent: {
                type: DataTypes.STRING,
                allowNull: false
            },
            majors: {
                type: DataTypes.STRING,
            },
            idTeacher: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            nameTeacher: {
                type: DataTypes.STRING,
            },
            idStudent: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            nameStudent: {
                type: DataTypes.STRING,
            },
            state: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            timestamps: true,
            underscrored: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );
    return Project;
}