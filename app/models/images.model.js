module.exports = (sequelize, Sequelize, DataTypes) => {
    const Image = sequelize.define(
        'image',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            url: {
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
        return Image;     
}