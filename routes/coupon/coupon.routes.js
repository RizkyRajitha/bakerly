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
    if (error.code === 404) {
      res.json({ success: false, msg: error.message });
    }
    if (error.original.code == 23505) {
      let payload = { success: false, msg: error.original.detail };
      res.status(400).json(payload);
    }
  }
};

exports.allCoupon = async (req, res) => {
  try {
    let coupons = await Coupon.getAllCoupons();
    res.json({ success: true, data: courses });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};
