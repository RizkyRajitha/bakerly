const express = require("express");
const router = express.Router();
const login = require("./login.routes");
const { loginValidator } = require("../../validators/login");

// router.use()

router.post("/loginwemail", loginValidator, login.loginwemail);

module.exports = router;
// module.exports = router;

/**
 * @swagger
 * /auth/loginwemail:
 *   post:
 *     summary: login a user to the system.
 *     description: login can be used to log admin ,customer to the system.
 *     parameters:
 *       - in: body
 *         name: email
 *         required: true
 *         description: registed email of user.
 *         schema:
 *           type: string
 *           example: tylor@swifty.com
 *       - in: body
 *         name: password
 *         required: true
 *         description:  password of registed user.
 *         schema:
 *           type: string
 *           example: 123
 *     responses:
 *       200:
 *         description: login with valid user name and password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description:
 *                   example: true
 *                 success:
 *                   type: boolean
 *                   description: true if the request is success.
 *                   example: true
 *
 *       401:
 *         description: login with invalid user name and password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: error message
 *                   example: invalid_password
 *                 success:
 *                   type: boolean
 *                   description: false if the request is failed.
 *                   example: false
 */
