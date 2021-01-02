const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const dbConfig = require("../config/db.config");

// const Sequelize = require("sequelize");
// const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/config.json")[env];
const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.Dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.District.hasMany;

db.User = require("./user.model.js")(sequelize, Sequelize);
db.District = require("./districts.model")(sequelize, Sequelize);

db.District.hasMany(db.User, { as: "user" });

db.User.belongsTo(db.District, {
  as: "district",
  foreingKey: "districtCode",
});

// ALTER TABLE "districts" ADD FOREIGN KEY ("code") REFERENCES "users" ("district_code");

// ALTER TABLE "shopdata" ADD FOREIGN KEY ("id") REFERENCES "users" ("shopdataid");

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
