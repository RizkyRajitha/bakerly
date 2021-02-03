const db = require("../models");
const Course = db.Course;

exports.createCourse = (course) => {
  return new Promise((resolve, reject) => {
    Course.create({
      name: course.name,
      desicription: course.desicription,
      price: course.price,
    })
      .then((course) => {
        console.log(course);
        resolve(course);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

exports.findAllCourses = () => {
  return Course.findAll({});
};
