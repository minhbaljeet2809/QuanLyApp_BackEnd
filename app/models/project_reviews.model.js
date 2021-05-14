module.exports = (sequelize, Sequelize, DataTypes) => {
    const ProjectReviews = sequelize.define(
        'project_reviews',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING, 
            }
            
        },{
            timestamps: true,
            underscrored: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );
    return ProjectReviews;

}