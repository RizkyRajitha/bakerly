const Users = require("../models").Users;
const Course = require("../models").Course;
const Coupon = require("../models").Coupons;
const CouponCourseJoin = require("../models").CouponCourseJoin;

exports.addCoupon = (coupon) => {
  return new Promise((resolve, reject) => {
    Coupon.create({
      code: coupon.code,
      ownerId: coupon.ownerId,
      createdBy: coupon.createdBy,
    })
      .then((coupon) => {
        console.log(coupon);
        resolve(coupon);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

exports.addCoursesToCoupon = (couponcoursejoin) => {
  return new Promise((resolve, reject) => {
    CouponCourseJoin.create({
      createdBy: couponcoursejoin.createdBy,
      discount: couponcoursejoin.discount,
      courseId: couponcoursejoin.courseId,
      couponId: couponcoursejoin.couponId,
    })
      .then((couponcoursejoin) => {
        console.log(couponcoursejoin);
        resolve(couponcoursejoin);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

exports.getCouponByCourseId = (courseId) => {
  return new Promise((resolve, reject) => {
    CouponCourseJoin.findAll({
      where: {
        courseId,
      },
      include: ["coupon" , "course"],
    })
      .then((couponcoursejoin) => {
        console.log(couponcoursejoin);
        resolve(couponcoursejoin);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};