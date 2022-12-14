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
db.leads = require("./Lead")(sequelize, Sequelize);
db.customers = require("./Customer")(sequelize, Sequelize);
db.products = require("./Product")(sequelize, Sequelize);

//Associations
//users, roles and user roles
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

// leads and users
db.leads.belongsTo(db.user, { foreignKey: "userId" });
db.user.hasMany(db.leads, { foreignKey: "userId" });

// leads and customers
db.leads.hasOne(db.customers, { foreignKey: "leadId" });
db.customers.belongsTo(db.leads, { foreignKey: "leadId" });

//customers, products and customer products

//A customer is able to have multiple products and a product can belong to multiple users......
//... in a many to many relationship. The CustomerProducts table allows me to create an association...
//...between the  Products table and Customers table. I am therefore able to save products as comma separated values in an array.
//For me, this is the best way to handle such a technical situation
db.products.belongsToMany(db.customers, {
  through: "CustomerProducts",
  foreignKey: "productId",
  otherKey: "customerId",
});
db.customers.belongsToMany(db.products, {
  through: "CustomerProducts",
  foreignKey: "customerId",
  otherKey: "productId",
});

module.exports = db;
