const { Model, DataTypes } = require("sequelize");
const sequelize = require("./connection").sequelize;

class CouponCourseJoin extends Model {}
CouponCourseJoin.init(
  {
    id: {
      type: DataTypes.UUID,
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
    couponId: {
      allowNull: false,
      references: {
        key: "id",
        model: "coupons",
      },
      type: DataTypes.UUID,
    },
    courseId: {
      allowNull: false,
      references: {
        key: "id",
        model: "courses",
      },
      type: DataTypes.UUID,
    },
    discount: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
  },
  {
    modelName: "couponcourses",
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

module.exports.CouponCourseJoin = CouponCourseJoin;
