const User = require("../models/user.model").Users;

/**
 * A song
 * @typedef {Object} User
 * @property {string} name - The name
 * @property {string} email - The email
 * @property {string} password - The password
 * @property {string} source - The source
 * @property {string} avatarUrl - The avatarUrl
 * @property {string} userType - The userType
 */

/**
 * Create new user
 * @param {User} user
 * @return {Promise<User>}
 */
exports.createUser = (user) => {
  return new Promise((resolve, reject) => {
    User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      source: user.source,
      avatarUrl: user.avatarUrl,
      userType: user.userType,
      // districtCode: user.districtCode,
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

/**
 * find All Users
 * @return {Promise<User>}
 */
exports.findAllUsers = () => {
  return User.findAll({ attributes: { exclude: ["password"] } });
};

/**
 * find All Customers
 * @return {Promise<User>}
 */
exports.findAllCustomers = () => {
  return User.findAll({ where: { userType: "customer" } });
};
/**
 * find All Users with disstric object
 * @return {Promise<User>}
 */
exports.findAllUsersWithDistrict = () => {
  return User.findAll({ include: ["district"] });
};
/**
 * find a User by email
 * @param {string} email
 * @return {Promise<User>}
 */
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

/**
 * find a User by Id
 * @param {string} Id
 * @return {Promise<User>}
 */
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
