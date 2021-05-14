module.exports = (sequelize, Sequelize, DataTypes) => {
    const ProjectStageLog = sequelize.define(
        'project_stage_log',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            idProjectLog: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            content: {
                type: DataTypes.STRING
            },
            percent:{
                type: DataTypes.INTEGER
            }
        },{
            timestamps: true,
            underscrored: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );
    return ProjectStageLog;

}