"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("couponcourses", {
      id: {
        type: Sequelize.UUID,
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
      couponId: {
        allowNull: false,
        references: {
          key: "id",
          model: "users",
        },
        type: Sequelize.UUID,
      },
      courseId: {
        allowNull: false,
        references: {
          key: "id",
          model: "users",
        },
        type: Sequelize.UUID,
      },
      discount: {
        allowNull: false,
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable("couponcourses");
  },
};
