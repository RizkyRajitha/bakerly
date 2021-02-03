const express = require("express");
const router = express.Router();

const course = require("./course.routes");

router.post("/createCourse", course.createCourse);
router.get("/getAllCourses", course.allCourses);
// router.get("/getdistrics", shop.allDistrics);

module.exports = router;
