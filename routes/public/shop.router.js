const express = require("express");
const router = express.Router();

const shop = require("./shop.routes");

router.get("/getprofile/:id", shop.profile);

module.exports = router;
