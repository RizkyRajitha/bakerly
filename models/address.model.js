module.exports = (sequalize, Sequelize) => {
  const ShopData = sequalize.define("shopData", {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    addressl1: { type: Sequelize.STRING },
    addressl2: { type: Sequelize.STRING },
    city: { type: Sequelize.STRING },
    postalcode: { type: Sequelize.STRING },
  });

  return ShopData;
};
