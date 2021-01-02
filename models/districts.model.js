module.exports = (sequelize, Sequelize) => {
  const District = sequelize.define("district", {
    code: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    province: { type: Sequelize.STRING }
  });

  return District;
};
