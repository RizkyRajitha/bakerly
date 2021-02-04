const express = require("express");
const router = express.Router();

const login = require("./login.routes");

router.post("/loginwemail", login.loginwemail);

module.exports = router;
// module.exports = router;
