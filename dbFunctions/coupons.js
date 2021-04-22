const Users = require("../models").Users;
const Course = require("../models").Course;
const Coupon = require("../models").Coupons;
const CouponCourseJoin = require("../models").CouponCourseJoin;

/**
 * Create a new coupon
 * @param {Coupon} coupon
 * @return {Promise<Coupon>}
 */
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

/**
 * add a course to a coupon
 * @param {CouponCourseJoin} CourseCouponCourseJoin
 * @return {Promise<CouponCourseJoin>}
 */
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
/**
 * get a coupon by courseId
 * @param {courseId} courseId
 * @return {Promise<couponcoursejoin>}
 */
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

/**
 * get a coupon by ownerId
 * @param {ownerId} ownerId
 * @return {Promise<couponcoursejoin>}
 */
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

/**
 * get a coupon by ownerId and CourseId
 * @param {ownerId} ownerId
 * @param {CourseId} CourseId
 * @return {Promise<couponcoursejoin>}
 */

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

/**
 * get all coupons 
 * @return {Promise<couponcoursejoin>}
 */
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
