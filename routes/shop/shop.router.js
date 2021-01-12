const express = require("express");
const router = express.Router();

const shop = require("./shop.routes");

router.post("/addshop", shop.addShop);
router.get("/usershop", shop.userShop);
router.get("/getdistrics", shop.allDistrics);

module.exports = router;
