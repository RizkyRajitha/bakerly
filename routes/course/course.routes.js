const Course = require("../../dbFunctions/course");

exports.createCourse = async (req, res) => {
  console.log(res.locals.id);
  console.log(req.body);

  console.log("create Course");
  try {
    let courseData = { ...req.body, createdBy: res.locals.id };
    console.log(courseData);
    let createdcourse = await Course.createCourse(courseData);
    console.log(createdcourse);
    res.status(200).json({ success: true, data: createdcourse });
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

exports.getCourses = async (req, res) => {
  try {
    console.log(req.query);

    if (!req.query.hasOwnProperty("active")) {
      res
        .status(400)
        .json({ success: false, msg: "invalid request set query type" });
    }
    let where = {
      // published: req.query && req.query.published,
      active: req.query.active,
    };

    console.log(where);

    let courses = await Course.findCourses(where);
    res.json({ success: true, data: courses });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

exports.courseList = async (req, res) => {
  try {
    let courses = await Course.findAllCourses(["id", "name"]);
    res.json({ success: true, data: courses });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

exports.deactivateCourses = async (req, res) => {
  try {
    let courseId = req.body.courseId;
    console.log("deactivateCourses");
    console.log(courseId);
    let courses = await Course.deactivateCourse(courseId);
    res.json({ success: true, data: courses });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};
