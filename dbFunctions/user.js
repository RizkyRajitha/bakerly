const { resolve } = require("path");
const db = require("../models");
const User = db.User;

exports.createUser = (user) => {
  return new Promise((resolve, reject) => {
    User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      source: user.source,
      avatarUrl: user.avatarUrl,
      districtCode: user.districtCode,
      //   shopnameid: user.shopnameid,
    })
      .then((user) => {
        // console.log(user);
        resolve(user);
      })
      .catch((err) => {
        // console.log(err);
        reject(err);
      });
  });
};

exports.findAllUsers = () => {
  return User.findAll({});
};

exports.findAllUsersWithDistrict = () => {
  return User.findAll({ include: ["district"] });
};

exports.findUserByEmail = (email, attributes = null) => {
  return new Promise((resolve, reject) => {
    if (attributes) {
      User.findAll({
        attributes: attributes,
        where: {
          email: email,
        },
      })
        .then((user) => {
          if (user.length) {
            resolve(user[0]);
          } else {
            reject({ code: 404, msg: "error : no user found" });
          }

          //   console.log(user);
        })
        .catch((error) => {
          reject(error);
          //   console.log(error);
        });
    } else {
      User.findAll({
        where: {
          email: email,
        },
      })
        .then((user) => {
          if (user.length) {
            resolve(user[0]);
          } else {
            reject({ code: 404, msg: "error : no user found" });
          }

          //   console.log(user);
        })
        .catch((error) => {
          reject(error);
          //   console.log(error);
        });
    }
  });
};

exports.findUserById = (id, attributes = null) => {
  return new Promise((resolve, reject) => {
    if (attributes) {
      User.findAll({
        attributes: attributes,
        where: {
          id: id,
        },
      })
        .then((user) => {
          if (user.length) {
            resolve(user[0]);
          } else {
            reject({ code: 404, msg: "error : no user found" });
          }

          //   console.log(user);
        })
        .catch((error) => {
          reject(error);
          //   console.log(error);
        });
    } else {
      User.findAll({
        where: {
          id: id,
        },
      })
        .then((user) => {
          if (user.length) {
            resolve(user[0]);
          } else {
            reject({ code: 404, msg: "error : no user found" });
          }

          //   console.log(user);
        })
        .catch((error) => {
          reject(error);
          //   console.log(error);
        });
    }
  });
};
