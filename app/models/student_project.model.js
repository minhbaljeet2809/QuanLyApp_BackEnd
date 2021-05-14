module.exports = (sequelize, Sequelize, DataTypes) => {
    const StudentProject = sequelize.define(
        'student_project',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            idStudent: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            idProject: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
            }
           
        },{
            timestamps: true,
            underscrored: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );
    return StudentProject;

}