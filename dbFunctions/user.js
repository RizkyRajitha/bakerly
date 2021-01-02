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
      shopnameid: user.shopnameid,
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

exports.findUserByEmail = (email) => {
  return User.findAll({
    where: {
      email: email,
    },
  });
};
