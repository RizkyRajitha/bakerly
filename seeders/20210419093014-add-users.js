"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          id: "2fdbb23e-51c1-4be7-a382-f2b5f6d1d634",
          name: "meriell rosan",
          email: "meriell@rosaan.com",
          password:
            "$2a$10$jaV7ZonU1NA8epcqHi6rZecQ6Q7HUXPSN387ZriTEBHtvp4ybgkom",
          // active: { type: DataTypes.BOOLEAN, defaultValue: true },
          source: "emailAndPassword",
          // avatarUrl: { type: DataTypes.STRING },
          userType: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),

          // first_name: "John",
          // last_name: "Doe",
          // bio: "I am a new user to this application",
          // createdAt: new Date(),
          // updatedAt: new Date(),
          // email: "johnDoe@test.com",
        },
        {
          id: "2fdbb23e-51c1-4be7-a382-f2b5f6d1d614",
          name: "tylor swift",
          email: "tylor@swift..com",
          password:
            "$2a$10$jaV7ZonU1NA8epcqHi6rZecQ6Q7HUXPSN387ZriTEBHtvp4ybgkom",
          // active: { type: DataTypes.BOOLEAN, defaultValue: true },
          source: "emailAndPassword",
          // avatarUrl: { type: DataTypes.STRING },
          userType: "customer",
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
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", [
      {
        email: "meriell@rosaan.com",
      },
      {
        email: "tylor@swift..com",
      },
    ]);
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
