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
  "/purchaseCourse",
  roleRestrictMiddleware(["customer"]),
  user.purchaseCourse
);
router.get(
  "/purchasedCourses",
  roleRestrictMiddleware(["customer"]),
  user.getPurchasedCourses
);

module.exports = router;

/**
 * @swagger
 * /user/userdashbaord:
 *   get:
 *     summary: get users dashboard details.
 *     description: get users dashboard details common to all the users.
 *     responses:
 *       200:
 *         description: get users dashboard details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 id:
 *                   type: UUID 
 *                 success:
 *                   type: boolean
 *                   description: true if the request is success.
 *                   example: true
 *
 * /user/getAllUsers:
 *   get:
 *     summary: get all users.
 *     description: get all users [Admin].
 *     responses:
 *       200:
 *         description: get all users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 id:
 *                   type: UUID 
 *                 success:
 *                   type: boolean
 *                   description: true if the request is success.
 *                   example: true
 *
 * /user/getAllCustomers:
 *   get:
 *     summary: get all customers.
 *     description: get all customers [Admin].
 *     responses:
 *       200:
 *         description: get all customers.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 id:
 *                   type: UUID 
 *                 success:
 *                   type: boolean
 *                   description: true if the request is success.
 *                   example: true
 *
 */
