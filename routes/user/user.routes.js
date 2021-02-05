const User = require("../../dbFunctions/user");
const Shop = require("../../dbFunctions/shopdata");
const Purchase = require("../../dbFunctions/puchase");
const Course = require("../../dbFunctions/course");

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

exports.viewAllUsers = async (req, res) => {
  try {
    let userList = await User.findAllUsers();
    console.log(userList);
    res.status(200).json({ success: true, data: userList });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

exports.viewAllCustomers = async (req, res) => {
  try {
    let customerList = await User.findAllCustomers();
    console.log(customerList);
    res.status(200).json({ success: true, data: customerList });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

exports.purchaseCourse = async (req, res) => {
  try {
    const courseId = req.body.courseId;
    console.log(courseId);

    let course = await Course.findCourseById(courseId);
    console.log(course);

    const purchase = {
      courseId,
      purchasedBy: res.locals.id,
      amount: course.price,
    };

    let purchaseRecord = await Purchase.createPurchase(purchase);
    console.log(purchaseRecord);
    res.status(200).json({ success: true, data: purchaseRecord });
  } catch (error) {
    res.json({ success: false, msg: error.original.message });
  }
};
