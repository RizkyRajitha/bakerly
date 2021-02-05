module.exports.development = {
  host: "localhost",
  username: "backerly",
  password: "123",
  database: "backerly",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
