const Course = require("../../dbFunctions/course");

exports.createCourse = async (req, res) => {
  console.log(req.id);
  console.log(req.body);

  console.log("create Course");
  try {
    // let existingShop = Shop.findShopByUserId(req.id);

    // if (existingShop) {
    //   res.status(400).json({ success: false, msg: "you cannot have 2 shops" });
    //   return;
    // }
    let courseData = { ...req.body, createdBy: req.id };
    console.log(courseData);
    await Course.createCourse(courseData);
    // createShopWithAddress(req.body, req.id);

    // let shop = await Shop.findShopByUserId(req.id);
    // shop.

    // console.log(shop);
    res.status(200).json({ success: true, data: courseData });
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

exports.allCourses = async (req, res) => {
  try {
    let courses = await Course.findAllCourses();
    res.json({ success: true, data: courses });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

// exports.allDistrics = async (req, res) => {
//   try {
//     let shopData = await Districts.readAllDistrics();

//     res.json({ success: true, data: shopData });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, msg: error.message });
//   }
// };
