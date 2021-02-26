const express = require("express");
const router = express.Router();
const { roleRestrictMiddleware } = require("../../middleware/roleRestrict");
const course = require("./course.routes");

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
router.get(
  "/getcourselist",
  roleRestrictMiddleware(["admin"]),
  course.courseList
);

router.get(
  "/getcoursewithlessons",
  roleRestrictMiddleware(["admin", "customer"]),
  course.courseList
);

router.get("/getcourses", roleRestrictMiddleware(["admin"]), course.getCourses);

router.post(
  "/deactivatecourse",
  roleRestrictMiddleware(["admin"]),
  course.deactivateCourses
);
// router.get("/getdistrics", shop.allDistrics);

module.exports = router;
