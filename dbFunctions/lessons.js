// const Course = require("../models/course.model").Course;
const Users = require("../models").Users;
const Lesson = require("../models").Lessons;

exports.createLesson = (lesson) => {
  return new Promise((resolve, reject) => {
    Lesson.create({
      name: lesson.name,
      desicription: lesson.desicription,
      courseId: lesson.courseId,
      createdBy: lesson.createdBy,
      uri: lesson.uri,
    })
      .then((lesson) => {
        console.log(lesson);
        resolve(lesson);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

exports.findLessonById = (id, attributes = null) => {
  return new Promise((resolve, reject) => {
    if (attributes) {
      Lesson.findAll({
        attributes: attributes,
        where: {
          id: id,
        },
        include: ["users"],
      })
        .then((lesson) => {
          if (lesson.length) {
            resolve(lesson[0]);
          } else {
            reject({ code: 404, msg: "error : no lesson found" });
          }

          //   console.log(user);
        })
        .catch((error) => {
          reject(error);
          //   console.log(error);
        });
    } else {
      Lesson.findAll({
        where: {
          id: id,
        },
      })
        .then((lesson) => {
          if (lesson.length) {
            resolve(lesson[0]);
          } else {
            reject({ code: 404, msg: "error : no lesson found" });
          }

          //   console.log(lesson);
        })
        .catch((error) => {
          reject(error);
          //   console.log(error);
        });
    }
  });
};

exports.findAllLessons = () => {
  // return Course.findAll({
  //   include: [{ model: Users, as: "users" }],
  // });
  // console.log(Users.name);
  // console.log(Users.associations);
  // return Users.findAll({ include: ["courses"] });
  return Lesson.findAll({
    include: [{ model: Users, attributes: ["name", "id", "createdAt"] }],
  });
};

exports.deactivateLesson = (id) => {
  return Lesson.findByPk(id).then((data) => {
    data.update({ active: false });
  });
};

exports.activateLesson = (id) => {
  return Lesson.findByPk(id).then((data) => {
    data.update({ active: true });
  });
};

exports.publishLesson = (id) => {
  return Lesson.findByPk(id).then((data) => {
    data.update({ published: true });
  });
};

exports.unpublishLesson = (id) => {
  return Lesson.findByPk(id).then((data) => {
    data.update({ published: false });
  });
};
