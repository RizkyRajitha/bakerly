const { sequelize, District } = require("../models");
const db = require("../models");
const Address = db.Address;
const Shop = db.ShopData;

exports.createShopWithAddress = async (shop, userId) => {
  const t = await sequelize.transaction();

  return new Promise(async (resolve, reject) => {
    try {
      // let userShop =
      let address = await Address.create(
        {
          addressl1: shop.address.addressl1,
          addressl2: shop.address.addressl2,
          city: shop.address.city,
          postalcode: shop.address.postalcode,
          districtCode: shop.address.districtCode,
        },
        { transaction: t }
      );
      let userShop = await Shop.create(
        {
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
          addressId: address.id,
        },
        { transaction: t }
      );
      await t.commit();
      // return userShop;

      resolve(userShop);
    } catch (error) {
      await t.rollback();
      reject(error);
    }
  });
};

exports.findShopByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    Shop.findAll({
      where: {
        userId: userId,
      },
      include: [
        {
          model: Address,
          as: "address",
          include: [{ model: District, as: "district" }],
        },
      ],
      // include: [{ model: Address, as: "address", nested: true }],
      // include: { all: true },
    })
      .then((shop) => {
        console.log(shop);
        // console.log(shop.address.getDistrict())
        resolve(shop);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
