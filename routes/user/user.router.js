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
router.get(
  "/getAllCustomers",
  roleRestrictMiddleware(["admin"]),
  user.viewAllCustomers
);
router.post(
  "/purchaseCouse",
  roleRestrictMiddleware(["customer"]),
  user.purchaseCourse
);

module.exports = router;
