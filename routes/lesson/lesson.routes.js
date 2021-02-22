const Lesson = require("../../dbFunctions/lessons");

exports.createLesson = async (req, res) => {
  console.log(res.locals.id);
  console.log(req.body);

  console.log("create Lesson");
  try {
    let lessonData = { ...req.body, createdBy: res.locals.id };
    console.log(lessonData);
    await Lesson.createLesson(lessonData);

    res.status(200).json({ success: true, data: lessonData });
  } catch (error) {
    console.log(error);
    if (error.original.code === "22P02") {
      res.json({ success: false, msg: `${error.message} check courseId` });
    }
    if (error.original.code == 23505) {
      let payload = { success: false, msg: error.original.detail };
      res.status(400).json(payload);
    }
  }
};

exports.getAllLessons = async (req, res) => {
  try {
    let courses = await Lesson.findAllLessons();
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
