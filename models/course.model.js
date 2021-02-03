const { Model, DataTypes } = require("sequelize");
const sequelize = require("./connection").sequelize;

class Course extends Model {}
Course.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING },
    desicription: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
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
    modelName: "courses",
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

module.exports.Course = Course;
