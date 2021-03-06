const express = require("express");
const router = express.Router();
const { roleRestrictMiddleware } = require("../../middleware/roleRestrict");
const coupon = require("./coupon.routes");

router.post(
  "/createcourse",
  roleRestrictMiddleware(["admin"]),
  coupon.createCoupon
);

router.get(
  "/getcouponbyownerid",
  roleRestrictMiddleware(["admin"]),
  coupon.getCouponByownerId
);
router.get(
  "/getcouponbyowneridandcourseid",
  roleRestrictMiddleware(["admin"]),
  coupon.getCouponByownerIdAndCourseId
);
router.get(
  "/getallcoupons",
  roleRestrictMiddleware(["admin"]),
  coupon.allCoupon
);

// router.get("/getdistrics", shop.allDistrics);

module.exports = router;
