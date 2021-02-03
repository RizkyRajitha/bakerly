// import { Sequelize } from "sequelize";
const Sequalize = require("sequelize");
const dbConfig = require("../config/db.config");
console.log(dbConfig);
const envConfig = dbConfig["development"];

const sequelize = new Sequalize(
  envConfig.database,
  envConfig.username,
  envConfig.password,
  {
    host: envConfig.host,
    dialect: envConfig.dialect,
    operatorsAliases: false,
    logging: console.log,
    pool: {
      max: envConfig.pool.max,
      min: envConfig.pool.min,
      acquire: envConfig.pool.acquire,
      idle: envConfig.pool.idle,
    },
    dialectOptions: {
      charset: "utf8",
      multipleStatements: true,
    },
  }
);

// const sequelize = new Sequelize(DB_URI, {
//   dialectOptions: {
//     charset: "utf8",
//     multipleStatements: true,
//   },
//   logging: false,
// });

module.exports.sequelize = sequelize;
// export default sequelize;
