const express = require("express");
const router = express.Router();
const { roleRestrictMiddleware } = require("../../middleware/roleRestrict");
const coupon = require("./coupon.routes");

router.post(
  "/createcourse",
  roleRestrictMiddleware(["admin"]),
  course.createCourse
);
router.get(
  "/getallcourses",
  roleRestrictMiddleware(["admin"]),
  course.allCourses
);

// router.get("/getdistrics", shop.allDistrics);

module.exports = router;
