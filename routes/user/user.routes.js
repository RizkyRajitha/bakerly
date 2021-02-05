const User = require("../../dbFunctions/user");
const Shop = require("../../dbFunctions/shopdata");

exports.userDashbaord = async (req, res) => {
  console.log(res.locals.id);
  console.log("user dashbaord");
  try {
    let user = await User.findUserById(res.locals.id, [
      "name",
      "id",
      "avatarUrl",
      "createdAt",
    ]);

    let shop = await Shop.findShopByUserId(res.locals.id);

    // let shop = await Shop.findShopByUserId(res.locals.id);

    console.log(user);

    let payload = { user, shop };

    // let payload = { user };

    res.status(200).json({ success: true, data: payload });
  } catch (error) {
    console.log(error);
    if (error.code === 404) {
      res.json({ success: false, msg: error.message });
    }
  }
};
