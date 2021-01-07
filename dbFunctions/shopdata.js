const db = require("../models");
const Shop = db.ShopData;

exports.createShop = (shop, userId) => {
  return new Promise((resolve, reject) => {
    Shop.create({
      userId: userId,
      name: shop.name,
      shopname: shop.shopname,
      shopid: shop.shopid,
      email: shop.email,
      accentcolor: shop.accentcolor,
      // address: shop.,
      instagramUrl: shop.instagramUrl,
      shopUrl: shop.shopUrl,
      description: shop.description,
      shopImageCoverUrl: shop.shopImageCoverUrl,
      phone: shop.phone,
      //   source: shop.source,
      avatarUrl: shop.avatarUrl,
    })
      .then((shop) => {
        console.log(shop);
        resolve(shop);
      })
      .catch((err) => {
        // console.log(err);
        reject(err);
      });
  });
};

exports.findShopByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    Shop.findAll({
      where: {
        userId: userId,
      },
    })
      .then((shop) => {
        console.log(shop);
        resolve(shop);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
