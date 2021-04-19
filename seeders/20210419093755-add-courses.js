"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "courses",
      [
        {
          id: "2fdbb13e-51c1-4be7-a382-f2b5f6d1d634",
          name: "maxximus prime tutorial wan",
          desicription: "heh heh hammoh neh",
          price: 10,
          createdBy: "2fdbb23e-51c1-4be7-a382-f2b5f6d1d634",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('courses', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("courses", [
      {
        id: "2fdbb13e-51c1-4be7-a382-f2b5f6d1d634",
      },
    ]);
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('courses', null, {});
     */
  },
};
