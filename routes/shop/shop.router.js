const express = require("express");
const router = express.Router();

const shop = require("./shop.routes");

router.post("/addshop", shop.addShop);
router.get("/usershop", shop.userShop);

module.exports = router;
