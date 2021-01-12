const Shop = require("../../dbFunctions/shopdata");

exports.profile = async (req, res) => {
  try {
    console.log(req.params.id);
    let shopData = await Shop.findShopByShopId(req.params.id);

    if (shopData.length === 0) {
      res
        .status(400)
        .json({ success: false, data: null, msg: "shop id not found" });
      return;
    }

    res.json({ success: true, data: shopData[0] });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};
