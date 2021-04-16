const Users = require("./user.model").Users;
const Course = require("./course.model").Course;
const Purchase = require("./purchases.model").Purchases;
const Lessons = require("./lessons.model").Lessons;
const Coupons = require("./coupon.model").Coupons;
const CouponCourseJoin = require("./couponcourse.model").CouponCourseJoin;

// course created - admin user one to many
Course.belongsTo(Users, {
  //   as: "createdUSer",
  foreignKey: {
    name: "createdUser",
    field: "createdBy",
  },
  //   foreignKeyConstraint: false,
});
// Users.hasMany(Course);
Users.hasMany(Course, {
  foreignKey: {
    name: "createdUser",
    field: "createdBy",
  },
});

// course purchase - cutomer user one to many
Purchase.belongsTo(Users, {
  foreignKey: {
    name: "purchasedUser",
    field: "purchasedBy",
  },
});

Users.hasMany(Purchase, {
  foreignKey: {
    name: "purchasedUser",
    field: "purchasedBy",
  },
});

// Lessons added - admin user one to many
Lessons.belongsTo(Users, {
  foreignKey: {
    name: "createdUser",
    field: "createdBy",
  },
});

Users.hasMany(Lessons, {
  foreignKey: {
    name: "createdUser",
    field: "createdBy",
  },
});

// Lessons added to a course oen to many

Lessons.belongsTo(Course, {
  foreignKey: {
    name: "CourseId",
    field: "courseId",
  },
});

Course.hasMany(Lessons, {
  foreignKey: {
    name: "CourseId",
    field: "courseId",
  },
});

// Coupon have one user and one user will only have a one coupon

Coupons.belongsTo(Users, {
  //   as: "createdUSer",
  foreignKey: {
    name: "createdUser",
    field: "createdBy",
  },
  //   foreignKeyConstraint: false,
});

Users.hasOne(Coupons, {
  foreignKey: {
    name: "createdUser",
    field: "createdBy",
  },
});

// Coupon have one user and one user will only have a one coupon

CouponCourseJoin.belongsTo(Users, {
  //   as: "createdUSer",
  foreignKey: {
    name: "createdUser",
    field: "createdBy",
  },
  //   foreignKeyConstraint: false,
});

Users.hasOne(CouponCourseJoin, {
  foreignKey: {
    name: "createdUser",
    field: "createdBy",
  },
});

// Coupon have many  CouponCourseJoin and one CouponCourseJoin will only have a one coupon

CouponCourseJoin.belongsTo(Coupons, {
  foreignKey: {
    name: "couponId",
    field: "couponId",
  },
});

Coupons.hasMany(CouponCourseJoin, {
  foreignKey: {
    name: "couponId",
    field: "couponId",
  },
});

//

CouponCourseJoin.belongsTo(Course, {
  foreignKey: {
    name: "courseId",
    field: "courseId",
  },
});

Course.hasMany(CouponCourseJoin, {
  foreignKey: {
    name: "courseId",
    field: "courseId",
  },
});

console.log(Course.associations);
console.log(Users.associations);

console.log(Coupons.associations);
console.log(CouponCourseJoin.associations);

module.exports = {
  Users,
  Course,
  Purchase,
  Lessons,
  Coupons,
  CouponCourseJoin,
};

// const Sequelize = require("sequelize");
// const { DataTypes } = require("sequelize");
// const dbConfig = require("../config/db.config");

// // const Sequelize = require("sequelize");
// // const env = process.env.NODE_ENV || "development";
// // const config = require(__dirname + "/../config/config.json")[env];
// const db = {};

// // let sequelize;
// // if (config.use_env_variable) {
// //   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// // } else {
// //   sequelize = new Sequelize(
// //     config.database,
// //     config.username,
// //     config.password,
// //     config
// //   );
// // }

// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.Dialect,
//   operatorsAliases: false,
//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle,
//   },
// });
// // fs.readdirSync(__dirname)
// //   .filter((file) => {
// //     return (
// //       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
// //     );
// //   })
// //   .forEach((file) => {
// //     const model = require(path.join(__dirname, file))(sequelize, Sequelize);
// //     db[model.name] = model;
// //   });

// // Object.keys(db).forEach((modelName) => {
// //   if (db[modelName].associate) {
// //     db[modelName].associate(db);
// //   }
// // });

// // db.District.hasMany;

// db.User = require("./user.model.js")(sequelize, Sequelize);
// db.Course = require("./course.model")(sequelize, Sequelize);
// // db.Address = require("./address.model")(sequelize, Sequelize);
// // db.ShopData = require("./shopdata.model")(sequelize, Sequelize);

// db.User.hasMany(db.Course, { as: "course" });

// db.Course.belongsTo(db.User, {
//   // as: "created_by",
//   foreingKey: "created_by",
// });
// // db.District.hasMany(db.User, { as: "user" });

// // db.User.belongsTo(db.District, {
// //   as: "district",
// //   foreingKey: "districtCode",
// // });

// // db.User.hasMany(db.ShopData, { as: "shopdata" });

// // db.ShopData.belongsTo(db.User, {
// //   as: "shopData",
// //   foreingKey: "userId",
// // });

// // db.District.hasMany(db.Address, { as: "district" });

// // db.Address.belongsTo(db.District, {
// //   as: "district",
// //   foreingKey: "districtCode",
// // });

// // db.Address.hasOne(db.ShopData, { as: "address" });

// // db.ShopData.belongsTo(db.Address, {
// //   // type: Sequelize.UUID,
// //   as: "address",
// //   foreingKey: "addressId",
// // });

// // db.Address.hasOne(db.ShopData);
// // db.ShopData.belongsTo(db.Address);

// // db.Address.hasOne(db.ShopData, { as: "address" });

// // db.ShopData.belongsTo(db.Address, {
// //   // type: Sequelize.UUID,
// //   as: "address",
// //   foreingKey: { type: DataTypes.UUID, name: "addressId" },
// // });

// // ALTER TABLE "districts" ADD FOREIGN KEY ("code") REFERENCES "users" ("district_code");

// // ALTER TABLE "shopdata" ADD FOREIGN KEY ("id") REFERENCES "users" ("shopdataid");

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
