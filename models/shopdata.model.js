module.exports = (sequalize, Sequalize) => {
  const ShopData = sequalize.define("shopData", {
    id: {
      type: Sequalize.UUID,
      defaultValue: Sequalize.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    shopname: { type: Sequalize.STRING, allowNull: false },
    shopid: { type: Sequalize.STRING, unique: true, allowNull: false },
    email: { type: Sequalize.STRING, allowNull: false, unique: true },
    accentcolor: { type: Sequalize.STRING },
    // address: { type: Sequalize.STRING },
    instagramUrl: { type: Sequalize.STRING },
    shopUrl: { type: Sequalize.STRING },
    description: { type: Sequalize.STRING },
    shopImageCoverUrl: { type: Sequalize.STRING },
    phone: { type: Sequalize.STRING },
    active: { type: Sequalize.BOOLEAN, defaultValue: true },
    source: { type: Sequalize.STRING },
    avatarUrl: { type: Sequalize.STRING },
    // shopnameid: { type: Sequalize.STRING, allowNull: false, unique: true },
  });

  return ShopData;
};

// id serial [pk, increment,not null,unique]
// userid serial
// email varchar
// phone varchar
// address varchar
// instagramUrl varchar
// shopUrl varchar
// shopname varchar
// shopImageCoverUrl varchar
