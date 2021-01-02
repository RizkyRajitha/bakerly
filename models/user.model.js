module.exports = (sequalize, Sequalize) => {
  const User = sequalize.define("user", {
    id: {
      type: Sequalize.UUID,
      defaultValue: Sequalize.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: { type: Sequalize.STRING },
    email: { type: Sequalize.STRING, allowNull: false, unique: true },
    password: { type: Sequalize.STRING, allowNull: true },
    active: { type: Sequalize.BOOLEAN, defaultValue: true },
    source: { type: Sequalize.STRING },
    avatarUrl: { type: Sequalize.STRING },
    shopnameid: { type: Sequalize.STRING, allowNull: false, unique: true },
  });

  return User;
};
