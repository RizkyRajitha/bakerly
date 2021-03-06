const { Model, DataTypes } = require("sequelize");
// import sequelize from "./connection";
const sequelize = require("./connection").sequelize;

class Users extends Model {}
Users.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: true },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
    source: { type: DataTypes.STRING },
    avatarUrl: { type: DataTypes.STRING },
    userType: { type: DataTypes.STRING ,allowNull: false},
  },
  {
    rawAttributes: {
      exclude: ["password"],
    },
    modelName: "users",
    sequelize,
  }
);

// Users.hasMany(Course);
// console.log(Users.associations);

module.exports.Users = Users;
