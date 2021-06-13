const config = require("../config/config.js");
const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
  config.db.DB_NAME,
  config.db.DB_USER,
  config.db.DB_PASS,
  {
    host: config.db.DB_HOST,
    dialect: config.db.dialect,
    operatorsAliases: false,
    poll: {
      max: config.db.pool.max,
      min: config.db.pool.min,
      acquire: config.db.pool.acquire,
      idle: config.db.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize, DataTypes);
db.news = require("./news.model.js")(sequelize, Sequelize, DataTypes);
db.student = require("./student.model")(sequelize, Sequelize, DataTypes);
db.teacher = require("./teacher.model")(sequelize, Sequelize, DataTypes);
db.project = require("./project.model")(sequelize, Sequelize, DataTypes);
db.class= require('./class.model.js')(sequelize, Sequelize, DataTypes);
db.project_progress = require('./project_progress.model.js')(sequelize, Sequelize, DataTypes);
db.project_progress_log = require('./project_progress_log.model.js')(sequelize, Sequelize, DataTypes);
db.project_reviews = require('./project_reviews.model.js')(sequelize, Sequelize, DataTypes);
db.image = require('./images.model.js')(sequelize, Sequelize, DataTypes);

// db.role.belongsToMany(db.user, {
//   through: "user_roles",
//   foreignKey: "role_id",
//   otherKey: "user_id"
// });

// db.user.belongsToMany(db.role, {
//   through: "user_roles",
//   foreignKey: "user_id",
//   otherKey: "role_id"
// });

// db.ROLES = ["user", "admin", "moderator"];

module.exports = db;