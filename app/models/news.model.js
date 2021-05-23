module.exports = (sequelize, Sequelize, DataTypes) => {
    const News = sequelize.define(
        "news", // Model name
        {
            // Attributes
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            subTitle: {
                type: DataTypes.STRING(500),
            },
            idImageUrl: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            content: {
                type: DataTypes.STRING(1000),
                allowNull: false
            },
            type: {
                type: DataTypes.INTEGER,
            },
            status: {
                type: DataTypes.BOOLEAN,
            },
            description: {
                type: DataTypes.STRING,
            },
            view: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            }
        },
        {
            // Options
            timestamps: true,
            underscrored: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );

    return News;
};