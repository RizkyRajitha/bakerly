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
      include: ["coupon", "course"],
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

exports.getCouponByownerId = (ownerId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let coupon = await Coupon.findAll({
        where: {
          ownerId,
        },
      });

      console.log(coupon);
      // resolve(coupon);

      if (coupon.length) {
        reject({ code: 404, message: "no coupons found" });
        return;
      }

      let coursecoupon = await CouponCourseJoin.findAll({
        where: { couponId: coupon[0].id },
      });

      if (coursecoupon.length) {
        reject({ code: 405, message: "no courses found for coupons" });
        return;
      }
      resolve(coursecoupon);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

exports.getCouponByownerIdAndCourseId = (ownerId, courseId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let coupon = await Coupon.findAll({
        where: {
          ownerId,
        },
      });

      if (coupon.length === 0) {
        reject({ code: 404, message: "no coupons found" });
        return;
      }
      // resolve(coupon);

      let coursecoupon = await CouponCourseJoin.findAll({
        where: { couponId: coupon[0].id, courseId },
      });

      if (coursecoupon.length) {
        reject({ code: 405, message: "no courses found for coupons" });
        return;
      }

      resolve(coursecoupon);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

exports.getAllCoupons = () => {
  return new Promise((resolve, reject) => {
    CouponCourseJoin.findAll({ include: ["coupon"] })
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
