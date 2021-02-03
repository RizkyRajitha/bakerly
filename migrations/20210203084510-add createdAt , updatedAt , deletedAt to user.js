module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn("users", "createdAt", {
      allowNull: false,
      type: Sequelize.DATE,
    });
    queryInterface.addColumn("users", "updatedAt", {
      allowNull: false,
      type: Sequelize.DATE,
    });
    queryInterface.addColumn("users", "deletedAt", {
      allowNull: true,
      type: Sequelize.DATE,
    });

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn("users", "createdAt")
    queryInterface.removeColumn("users", "updatedAt")
    queryInterface.removeColumn("users", "deletedAt")

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
