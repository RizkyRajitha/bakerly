const Course = require("../../dbFunctions/course");

exports.createCourse = async (req, res) => {
  console.log(res.locals.id);
  console.log(req.body);

  console.log("create Course");
  try {
    let courseData = { ...req.body, createdBy: res.locals.id };
    console.log(courseData);
    await Course.createCourse(courseData);

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

exports.deactivateCourses = async (req, res) => {
  try {
    let courseId = req.body.courseId;
    console.log('deactivateCourses')
    console.log(courseId);
    let courses = await Course.deactivateCourse(courseId);
    res.json({ success: true, data: courses });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};
