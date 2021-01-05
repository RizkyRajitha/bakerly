const User = require("../../dbFunctions/user");

exports.userDashbaord = async (req, res) => {
  console.log(req.id);
  console.log("user dashbaord");
  try {
    let user = await User.findUserById(req.id, [
      "name",
      "id",
      "avatarUrl",
      "createdAt",
    ]);

    console.log(user);

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    // console.log(error);
    if (error.code === 404) {
      res.json({ success: false, msg: error.message });
    }
  }
};
