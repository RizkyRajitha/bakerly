/** @type {import("express").Request} */
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

exports.deactivateLesson = async (req, res) => {
  try {
    let lessonId = req.body.lessonId;
    console.log("deactivate Lesson");
    console.log(lessonId);
    let lesson = await Lesson.deactivateLesson(lessonId);
    res.json({ success: true, data: lesson });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

exports.activateLesson = async (req, res) => {
  try {
    let lessonId = req.body.lessonId;
    console.log("activate Lesson");
    console.log(lessonId);
    let lesson = await Lesson.activateLesson(lessonId);
    res.json({ success: true, data: lesson });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

exports.publishLesson = async (req, res) => {
  try {
    let lessonId = req.body.lessonId;
    console.log("publish Lesson");
    console.log(lessonId);
    let lesson = await Lesson.publishLesson(lessonId);
    res.json({ success: true, data: lesson });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

exports.unpublishLesson = async (req, res) => {
  try {
    let lessonId = req.body.lessonId;
    console.log("unpublish Lesson");
    console.log(lessonId);
    let lesson = await Lesson.unpublishLesson(lessonId);
    res.json({ success: true, data: lesson });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};
