const Coupon = require("../../dbFunctions/coupons");

exports.createCoupon = async (req, res) => {
  console.log(res.locals.id);
  console.log(req.body);

  console.log("create Coupon");
  try {
    let CouponData = { ...req.body, createdBy: res.locals.id };
    console.log(CouponData);
    let createdCoupon = await Coupon.addCoupon(CouponData);
    console.log(createdCoupon);
    res.status(200).json({ success: true, data: createdCoupon });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

exports.addCourseToCoupon = async (req, res) => {
  console.log(req.body);
  try {
    let CouponData = { ...req.body, createdBy: res.locals.id };
    console.log(CouponData);
    let addedCourse = Coupon.addCoursesToCoupon(CouponData);
    console.log(addedCourse);
    res.status(200).json({ success: true, data: addedCourse });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

exports.getCouponByownerId = async (req, res) => {
  console.log(req.body);
  try {
    let coupon = Coupon.getCouponByownerId(req.body.ownerId);
    console.log(coupon);
    res.status(200).json({ success: true, data: coupon });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

exports.getCouponByownerIdAndCourseId = async (req, res) => {
  console.log(req.body);
  try {
    let coupon = Coupon.getCouponByownerIdAndCourseId({
      ownerId: req.body.ownerId,
      courseId: req.body.courseId,
    });

    console.log(coupon);
    res.status(200).json({ success: true, data: coupon });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

exports.allCoupon = async (req, res) => {
  try {
    let coupons = await Coupon.getAllCoupons();
    res.json({ success: true, data: coupons });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};
