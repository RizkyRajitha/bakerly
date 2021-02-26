const express = require("express");
const router = express.Router();
const signup = require("./signup.routes");
const { signupValidator } = require("../../validators/signup");

router.post("/signupwemail", signupValidator, signup.signupwemail);
router.post("/signupwegoogle", signup.signupwegoogle);

module.exports = router;

/**
 * @swagger
 * /auth/signupwemail:
 *   post:
 *     summary: signup a user to system.
 *     description: signup user is added as a customer in this route.
 *     parameters:
 *       - in: body
 *         name: email
 *         required: true
 *         description: registed email of user.
 *         schema:
 *           type: string
 *           example: tylor@swifty.com
 *       - in: body
 *         name: name
 *         required: false
 *         description: name of user.
 *         schema:
 *           type: string
 *           example: tylor swifty
 *       - in: body
 *         name: password
 *         required: true
 *         description:  password of registed user.
 *         schema:
 *           type: string
 *           example: 123
 *     responses:
 *       200:
 *         description: signup with valid email with no duplicate users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: success message
 *                   example: user_created
 *                 success:
 *                   type: boolean
 *                   description: true if the request is success.
 *                   example: true
 *       400:
 *         description: signup with duplicate users email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: error message
 *                   example: duplicate_user
 *                 success:
 *                   type: boolean
 *                   description: false if the request is failed.
 *                   example: false
 *       500:
 *         description: signup with duplicate users email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: error message
 *                   example: database connection error
 *                 success:
 *                   type: boolean
 *                   description: false if the request is failed.
 *                   example: false
 */
