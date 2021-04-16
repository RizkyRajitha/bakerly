"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("coupons", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      code: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      active: { type: Sequelize.BOOLEAN, defaultValue: true },
      createdBy: {
        allowNull: false,
        references: {
          key: "id",
          model: "users",
        },
        type: Sequelize.UUID,
      },
      ownerId: {
        allowNull: false,
        references: {
          key: "id",
          model: "users",
        },
        type: Sequelize.UUID,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("coupons");
  },
};
