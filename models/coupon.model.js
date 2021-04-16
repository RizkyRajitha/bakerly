const { Model, DataTypes } = require("sequelize");
const sequelize = require("./connection").sequelize;

class Coupons extends Model {}
Coupons.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
    createdBy: {
      allowNull: false,
      references: {
        key: "id",
        model: "users",
      },
      type: DataTypes.UUID,
    },
    ownerId: {
      allowNull: false,
      references: {
        key: "id",
        model: "users",
      },
      type: DataTypes.UUID,
    },
  },
  {
    modelName: "coupons",
    sequelize,
  }
);
// Course.associate = (models) => {
//   console.log("ass");
//   console.log(models);
//   Course.belongsTo(models.users, { as: "playlist" });
// };
// Course.belongsTo(Users, { as: "asa", foreignKey: "createdBy" });
// console.log(Course.associations);

module.exports.Coupons = Coupons;
