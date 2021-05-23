module.exports = (sequelize, Sequelize, DataTypes) => {
    const ProjectLog = sequelize.define(
        'project_log',
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
    return ProjectLog;

}