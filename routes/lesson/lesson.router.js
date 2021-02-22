const express = require("express");
const router = express.Router();
const roleRestrictMiddleware = require("../../middleware/roleRestrict")
  .roleRestrictMiddleware;
const lesson = require("./lesson.routes");

router.post(
  "/createlesson",
  roleRestrictMiddleware(["admin"]),
  lesson.createLesson
);
router.get(
  "/getalllessons",
  roleRestrictMiddleware(["admin"]),
  lesson.getAllLessons
);

router.get(
  "/deactivatelesson",
  roleRestrictMiddleware(["admin"]),
  lesson.deactivateLesson
);

router.get(
  "/activatelesson",
  roleRestrictMiddleware(["admin"]),
  lesson.activateLesson
);

router.get(
  "/publishlesson",
  roleRestrictMiddleware(["admin"]),
  lesson.publishLesson
);
router.get(
  "/unpublishlesson",
  roleRestrictMiddleware(["admin"]),
  lesson.unpublishLesson
);

// router.post(
//   "/deactivatelesson",
//   roleRestrictMiddleware(["admin"]),
//   lesson.deactivateCourses
// );
// router.get("/getdistrics", shop.allDistrics);

module.exports = router;
