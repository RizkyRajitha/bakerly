// import { Sequelize } from "sequelize";
const Sequalize = require("sequelize");
const dbConfig = require("../config/db.config");
console.log(dbConfig);
const env = process.env.NODE_ENV || "development"; //"staging";
console.log(env);
let sequelize;

if (env === "development") {
  let envConfig = dbConfig[env];

  sequelize = new Sequalize(
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
} else if (env === "staging") {
  console.log(process.env.DB_URI);
  sequelize = new Sequalize(process.env.DB_URI); //'postgres://backerly:123@localhost/backerly?charset=UTF8'
} else if (env === "production") {
  let dboptions = {
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: { ssl: true, rejectUnauthorized: false },
  };
  console.log(process.env.DB_URI);
  console.log(dboptions);
  sequelize = new Sequalize(process.env.DB_URI, dboptions); //'postgres://backerly:123@localhost/backerly?charset=UTF8'
}
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports.sequelize = sequelize;
// export default sequelize;
