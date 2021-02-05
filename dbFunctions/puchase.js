// const Course = require("../models/course.model").Course;
// const Users = require("../models").Users;

const Purchase = require("../models").Purchase;

exports.createPurchase = (purchase) => {
  return new Promise((resolve, reject) => {
    Purchase.create({
      purchasedBy: purchase.purchasedBy,
      courseId: purchase.courseId,
      amount: purchase.amount,
    })
      .then((course) => {
        console.log(course);
        resolve(course);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

exports.findPurchaseByUserId = (purchasedBy) => {
  return new Promise((resolve, reject) => {
    Purchase.findAll({ where: { purchasedBy } })
      .then((course) => {
        console.log(course);
        resolve(course);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
