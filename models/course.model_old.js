module.exports = (sequalize, Sequalize) => {
  const Course = sequalize.define("course", {
    id: {
      type: Sequalize.UUID,
      defaultValue: Sequalize.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: { type: Sequalize.STRING },
    desicription: { type: Sequalize.STRING },
    price: { type: Sequalize.INTEGER },
    active: { type: Sequalize.BOOLEAN, defaultValue: true },
  });

  return Course;
};

/*
    "id" int PRIMARY KEY,
  "name" varchar,
  "desicription" varchar,
  "created_by" int NOT NULL,
  "price" int,
  "active" varchar*/



