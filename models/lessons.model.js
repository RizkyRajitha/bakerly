const { Model, DataTypes } = require("sequelize");
const sequelize = require("./connection").sequelize;

class Lessons extends Model {}
Lessons.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    courseId: {
      allowNull: false,
      references: {
        key: "id",
        model: "courses",
      },
      type: DataTypes.UUID,
    },
    name: { type: DataTypes.STRING },
    desicription: { type: DataTypes.STRING },
    uri: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING },
    createdBy: {
      allowNull: false,
      references: {
        key: "id",
        model: "users",
      },
      type: DataTypes.UUID,
    },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
    published: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    rawAttributes: {
      exclude: ["password"],
    },
    modelName: "lessons",
    sequelize,
  }
);

// Lessons.hasMany(Course);
// console.log(Lessons.associations);

module.exports.Lessons = Lessons;
