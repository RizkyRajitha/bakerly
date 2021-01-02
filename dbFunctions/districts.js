const db = require("../models");
const District = db.District;

exports.createDistric = (district) => {
  return new Promise((resolve, reject) => {
    District.create({
      name: district.name,
      province: district.province,
    })
      .then((district) => {
        // console.log(district);
        resolve(district);
      })
      .catch((err) => {
        // console.log(err);
        reject(err);
      });
  });
};
