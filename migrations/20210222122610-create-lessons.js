"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("lessons", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      courseId: {
        allowNull: false,
        references: {
          key: "id",
          model: "courses",
        },
        type: Sequelize.UUID,
      },
      name: { type: Sequelize.STRING },
      desicription: { type: Sequelize.STRING },
      createdBy: {
        allowNull: false,
        references: {
          key: "id",
          model: "users",
        },
        type: Sequelize.UUID,
      },
      active: { type: Sequelize.BOOLEAN, defaultValue: true },
      published: { type: Sequelize.BOOLEAN, defaultValue: false },
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
    await queryInterface.dropTable("lessons");
  },
};
