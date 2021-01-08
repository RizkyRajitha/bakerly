const db = require("../models");
const Address = db.Address;

exports.createAddress = (address, distictCode) => {
  console.log(address, distictCode);
  return new Promise((resolve, reject) => {
    Address.create({
      addressl1: address.addressl1,
      addressl2: address.addressl2,
      city: address.city,
      postalcode: address.postalcode,
      distictCode: distictCode,
    })
      .then((address) => {
        // console.log(address);
        resolve(address);
      })
      .catch((err) => {
        // console.log(err);
        reject(err);
      });
  });
};
