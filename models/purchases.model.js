const { Model, DataTypes } = require("sequelize");
const sequelize = require("./connection").sequelize;

class Purchases extends Model {}
Purchases.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    purchasedBy: {
      allowNull: false,
      references: {
        key: "id",
        model: "users",
      },
      type: DataTypes.UUID,
      unique: "compositeIndex",
    },
    courseId: {
      allowNull: false,
      references: {
        key: "id",
        model: "courses",
      },
      type: DataTypes.UUID,
      unique: "compositeIndex",
    },
    amount: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    modelName: "purchases",
    sequelize,
  }
);

module.exports.Purchases = Purchases;
