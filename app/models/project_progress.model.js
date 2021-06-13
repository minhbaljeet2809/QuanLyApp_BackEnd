module.exports = (sequelize, Sequelize, DataTypes) => {
    const ProjectProgress = sequelize.define(
        'project_progress',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            idProject:{
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            stage: {
                type: DataTypes.STRING,
            },
            studentRate: {
                type: DataTypes.INTEGER,
            },
            teacherRate: {
                type: DataTypes.INTEGER,
            },
            attitudeStudy: {
                type: DataTypes.STRING,
            },
            attWithTeacher: {
                type: DataTypes.STRING,
            },
            abilityRate: {
                type: DataTypes.STRING
            },
            planState: {
                type: DataTypes.STRING
            }
        },{
            timestamps: true,
            underscrored: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );
    return ProjectProgress;

}