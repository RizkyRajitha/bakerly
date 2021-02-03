module.exports.development = {
  host: "localhost",
  username: "postgres",
  password: "123",
  database: "ultralegendpro",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
