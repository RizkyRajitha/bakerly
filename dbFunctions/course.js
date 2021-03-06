// const Course = require("../models/course.model").Course;
const Users = require("../models").Users;

const Course = require("../models").Course;

/**
 * create a course
 * @param {Course} course
 * @return {Promise<Course>}
 */
exports.createCourse = (course) => {
  return new Promise((resolve, reject) => {
    Course.create({
      name: course.name,
      desicription: course.desicription,
      price: course.price,
      createdBy: course.createdBy,
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

/**
 * find a Course By Id
 * @param {string} Id
 * @return {Promise<Course>}
 */
exports.findCourseById = (id, attributes = null) => {
  return new Promise((resolve, reject) => {
    if (attributes) {
      Course.findAll({
        attributes: attributes,
        where: {
          id: id,
        },
        include: ["users"],
      })
        .then((course) => {
          if (course.length) {
            resolve(course[0]);
          } else {
            reject({ code: 404, msg: "error : no course found" });
          }

          //   console.log(user);
        })
        .catch((error) => {
          reject(error);
          //   console.log(error);
        });
    } else {
      Course.findAll({
        where: {
          id: id,
        },
      })
        .then((course) => {
          if (course.length) {
            resolve(course[0]);
          } else {
            reject({ code: 404, msg: "error : no course found" });
          }

          //   console.log(course);
        })
        .catch((error) => {
          reject(error);
          //   console.log(error);
        });
    }
  });
};

/**
 * find all Course
 * @return {Promise<Course>}
 */
exports.findAllCourses = (attributes = null) => {
  // return Course.findAll({
  //   include: [{ model: Users, as: "users" }],
  // });
  // console.log(Users.name);
  // console.log(Users.associations);
  // return Users.findAll({ include: ["courses"] });
  if (attributes) {
    return Course.findAll({
      attributes,
      // include: [{ model: Users, attributes: ["name", "id", "createdAt"] }],
    });
  } else {
    return Course.findAll({
      include: [{ model: Users, attributes: ["name", "id", "createdAt"] }],
    });
  }
};

exports.findCourses = (where = null, attributes = null) => {
  if (attributes) {
    return Course.findAll({
      attributes,
      where,
      // include: [{ model: Users, attributes: ["name", "id", "createdAt"] }],
    });
  } else {
    return Course.findAll({
      where,
      include: [{ model: Users, attributes: ["name", "id", "createdAt"] }],
    });
  }
};

/**
 * deactivate a Course By Id
 * @param {string} Id 
//  * @return {Promise<Course>}
 */
exports.deactivateCourse = (id) => {
  return Course.findByPk(id).then((data) => {
    data.update({ active: false });
  });
};
