module.exports = (sequalize, Sequelize) => {
  const Address = sequalize.define("address", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    addressl1: { type: Sequelize.STRING },
    addressl2: { type: Sequelize.STRING },
    city: { type: Sequelize.STRING },
    postalcode: { type: Sequelize.STRING },
  });

  return Address;
};
