module.exports = {
    HOST: "localhost",
    USER: "sequalizedemo",
    PASSWORD: "demo",
    DB: "sequalizedemo",
    Dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };