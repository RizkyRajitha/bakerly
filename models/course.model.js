const { Model, DataTypes } = require("sequelize");
const sequelize = require("./connection").sequelize;

class Course extends Model {}
Course.init(
  {
    id: {
      type: Sequalize.UUID,
      defaultValue: Sequalize.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: { type: Sequalize.STRING },
    desicription: { type: Sequalize.STRING },
    price: { type: Sequalize.INTEGER },
    active: { type: Sequalize.BOOLEAN, defaultValue: true },
    createdBy: {
      allowNull: false,
      references: {
        key: "id",
        model: "users",
      },
      type: DataTypes.UUID,
    },
  },
  {
    modelName: "course",
    sequelize,
  }
);

module.exports.Course = Course;
