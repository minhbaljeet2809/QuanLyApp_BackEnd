module.exports = (sequelize, Sequelize, DataTypes) => {
    const ProjectProgressLog = sequelize.define(
        'project_progress_log',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            idProjectProgress: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            content: {
                type: DataTypes.STRING
            },
            percent:{
                type: DataTypes.STRING(10)
            },
            worker:{
                type: DataTypes.STRING(100)
            }
        },{
            timestamps: true,
            underscrored: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );
    return ProjectProgressLog;

}