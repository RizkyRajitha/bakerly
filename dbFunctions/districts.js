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

exports.readAllDistrics = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let districts = await District.findAll();

      let data = districts.map(({ code, name }) => ({
        code,
        name,
      }));

      resolve(data);
    } catch (error) {
      reject(error);
    }

    // District.create({
    //   name: district.name,
    //   province: district.province,
    // })
    //   .then((district) => {
    //     // console.log(district);
    //     resolve(district);
    //   })
    //   .catch((err) => {
    //     // console.log(err);
    //     reject(err);
    //   });
  });
};
