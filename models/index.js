const dotenv = require("dotenv");
// const env = require('./env.js');

const Sequelize = require("sequelize");
dotenv.config();
// console.log(dotenv.config());
// console.log(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD);
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || mysql,
    // operatorsAliases: true,
    pool: {
      max: +process.env.POOL_MAX,
      min: +process.env.POOL_MIN,
      acquire: process.env.POOL_ACQUIRE,
      idle: process.env.POOL_IDLE,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
// db.Op = Sequelize;

db.user = require("./User")(sequelize, Sequelize);
db.role = require("./Role")(sequelize, Sequelize);

//users, roles and userroles
db.role.belongsToMany(db.user, {
  through: "UserRoles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "UserRoles",
  foreignKey: "userId",
  otherKey: "roleId",
});

// db.role.belongsTo(db.user, { foreignKey: "roleId" });

// db.user.hasOne(db.role, {
//   foreignKey: "roleId",
// });

module.exports = db;
