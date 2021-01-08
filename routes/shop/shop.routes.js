const Shop = require("../../dbFunctions/shopdata");

exports.addShop = async (req, res) => {
  console.log(req.id);
  console.log(req.body);

  console.log("add shop");
  try {
    let existingShop = Shop.findShopByUserId(req.id);

    // if (existingShop) {
    //   res.status(400).json({ success: false, msg: "you cannot have 2 shops" });
    //   return;
    // }
    
    await Shop.createShopWithAddress(req.body, req.id);

    let shop = await Shop.findShopByUserId(req.id);
    // shop.

    console.log(shop);
    res.status(200).json({ success: true, data: shop });
  } catch (error) {
    console.log(error);
    if (error.code === 404) {
      res.json({ success: false, msg: error.message });
    }
    if (error.original.code == 23505) {
      let payload = { success: false, msg: error.original.detail };
      res.status(400).json(payload);
    }
  }
};

exports.userShop = async (req, res) => {
  try {
    let shopData = await Shop.findShopByUserId(req.id);

    res.json({ success: true, data: shopData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};
