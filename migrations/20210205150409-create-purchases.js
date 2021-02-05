"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("purchases", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      purchasedBy: {
        allowNull: false,
        references: {
          key: "id",
          model: "users",
        },
        type: Sequelize.UUID,
        unique: "compositeIndex",
      },
      courseId: {
        allowNull: false,
        references: {
          key: "id",
          model: "courses",
        },
        type: Sequelize.UUID,
        unique: "compositeIndex",
      },
      amount: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addConstraint("purchases", {
      fields: ["courseId", "purchasedBy"],
      type: "unique",
      name: "courseIdAndpurchasedByConstrain",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("purchases");
  },
};
