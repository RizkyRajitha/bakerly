const express = require("express");
const router = express.Router();
const roleRestrictMiddleware = require("../../middleware/roleRestrict")
  .roleRestrictMiddleware;

const course = require("./course.routes");

router.post(
  "/createCourse",
  roleRestrictMiddleware(["admin"]),
  course.createCourse
);
router.get(
  "/getAllCourses",
  roleRestrictMiddleware(["admin"]),
  course.allCourses
);
// router.get("/getdistrics", shop.allDistrics);

module.exports = router;
