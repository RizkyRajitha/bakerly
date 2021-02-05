const express = require("express");
const router = express.Router();
const user = require("./user.routes");
const roleRestrictMiddleware = require("../../middleware/roleRestrict")
  .roleRestrictMiddleware;

router.get("/userdashbaord", user.userDashbaord);
router.get(
  "/getAllUsers",
  roleRestrictMiddleware(["admin"]),
  user.viewAllUsers
);

module.exports = router;
