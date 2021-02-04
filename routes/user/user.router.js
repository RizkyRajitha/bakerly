const express = require("express");
const router = express.Router();

const user = require("./user.routes");

router.get("/userdashbaord", user.userDashbaord);

module.exports = router;
