const express = require("express");
const router = express.Router();

const signup = require("./signup.routes");

router.post("/signupwemail", signup.signupwemail);

module.exports = router;
