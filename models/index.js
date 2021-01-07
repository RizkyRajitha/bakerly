const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
// Sequelize.
const basename = path.basename(__filename);
const dbConfig = require("../config/db.config");

// const Sequelize = require("sequelize");
// const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/config.json")[env];
const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.Dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.District.hasMany;

db.User = require("./user.model.js")(sequelize, Sequelize);
db.District = require("./districts.model")(sequelize, Sequelize);
db.Address = require("./address.model")(sequelize, Sequelize);
db.ShopData = require("./shopdata.model")(sequelize, Sequelize);

db.District.hasMany(db.User, { as: "user" });

db.User.belongsTo(db.District, {
  as: "district",
  foreingKey: "districtCode",
});

db.User.hasMany(db.ShopData, { as: "shopdata" });

db.ShopData.belongsTo(db.User, {
  as: "shopData",
  foreingKey: "userId",
});

db.District.hasMany(db.Address, { as: "district" });

db.Address.belongsTo(db.District, {
  as: "district",
  foreingKey: "districtCode",
});

db.Address.hasOne(db.ShopData, { as: "address" });

db.ShopData.belongsTo(db.Address, {
  // type: Sequelize.UUID,
  as: "address",
  foreingKey: "addressId",
});

// db.Address.hasOne(db.ShopData);
// db.ShopData.belongsTo(db.Address);

// db.Address.hasOne(db.ShopData, { as: "address" });

// db.ShopData.belongsTo(db.Address, {
//   // type: Sequelize.UUID,
//   as: "address",
//   foreingKey: { type: DataTypes.UUID, name: "addressId" },
// });

// ALTER TABLE "districts" ADD FOREIGN KEY ("code") REFERENCES "users" ("district_code");

// ALTER TABLE "shopdata" ADD FOREIGN KEY ("id") REFERENCES "users" ("shopdataid");

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

/**
 * 
 Executing (default): ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL;ALTER TABLE "users" ALTER COLUMN "password" DROP DEFAULT;ALTER TABLE "users" ALTER COLUMN "password" TYPE VARCHAR(255);
Executing (default): ALTER TABLE "users" ALTER COLUMN "active" DROP NOT NULL;ALTER TABLE "users" ALTER COLUMN "active" SET DEFAULT true;ALTER TABLE "users" ALTER COLUMN "active" TYPE BOOLEAN;
Executing (default): ALTER TABLE "users" ALTER COLUMN "source" DROP NOT NULL;ALTER TABLE "users" ALTER COLUMN "source" DROP DEFAULT;ALTER TABLE "users" ALTER COLUMN "source" TYPE VARCHAR(255);
Executing (default): ALTER TABLE "users" ALTER COLUMN "avatarUrl" DROP NOT NULL;ALTER TABLE "users" ALTER COLUMN "avatarUrl" DROP DEFAULT;ALTER TABLE "users" ALTER COLUMN "avatarUrl" TYPE VARCHAR(255);
Executing (default): ALTER TABLE "users" ALTER COLUMN "createdAt" SET NOT NULL;ALTER TABLE "users" ALTER COLUMN "createdAt" DROP DEFAULT;ALTER TABLE "users" ALTER COLUMN "createdAt" TYPE TIMESTAMP WITH TIME ZONE;
Executing (default): ALTER TABLE "users" ALTER COLUMN "updatedAt" SET NOT NULL;ALTER TABLE "users" ALTER COLUMN "updatedAt" DROP DEFAULT;ALTER TABLE "users" ALTER COLUMN "updatedAt" TYPE TIMESTAMP WITH TIME ZONE;
Executing (default): ALTER TABLE "users" DROP CONSTRAINT "users_districtCode_fkey"
Executing (default): ALTER TABLE "users"  ADD FOREIGN KEY ("districtCode") REFERENCES "districts" ("code") ON DELETE SET NULL ON UPDATE CASCADE;
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'users' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): CREATE TABLE IF NOT EXISTS "shopData" ("id" UUID NOT NULL UNIQUE , "shopname" VARCHAR(255) NOT NULL, "shopid" VARCHAR(255) NOT NULL UNIQUE, "email" VARCHAR(255) NOT NULL UNIQUE, "accentcolor" VARCHAR(255), "instagramUrl" VARCHAR(255), "shopUrl" VARCHAR(255), "description" VARCHAR(255), "shopImageCoverUrl" VARCHAR(255), "phone" VARCHAR(255), "active" BOOLEAN DEFAULT true, "source" VARCHAR(255), "avatarUrl" VARCHAR(255), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "userId" UUID REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE, "shopDataId" UUID REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE, "addressId" INTEGER REFERENCES "shopData" ("id") ON DELETE SET NULL ON UPDATE CASCADE, PRIMARY KEY ("id"));
Executing (default): SELECT pk.constraint_type as "Constraint",c.column_name as "Field", c.column_default as "Default",c.is_nullable as "Null", (CASE WHEN c.udt_name = 'hstore' THEN c.udt_name ELSE c.data_type END) || (CASE WHEN c.character_maximum_length IS NOT NULL THEN '(' || c.character_maximum_length || ')' ELSE '' END) as "Type", (SELECT array_agg(e.enumlabel) FROM pg_catalog.pg_type t JOIN pg_catalog.pg_enum e ON t.oid=e.enumtypid WHERE t.typname=c.udt_name) AS "special", (SELECT pgd.description FROM pg_catalog.pg_statio_all_tables AS st INNER JOIN pg_catalog.pg_description pgd on (pgd.objoid=st.relid) WHERE c.ordinal_position=pgd.objsubid AND c.table_name=st.relname) AS "Comment" FROM information_schema.columns c LEFT JOIN (SELECT tc.table_schema, tc.table_name, cu.column_name, tc.constraint_type FROM information_schema.TABLE_CONSTRAINTS tc JOIN information_schema.KEY_COLUMN_USAGE  cu ON tc.table_schema=cu.table_schema and tc.table_name=cu.table_name and tc.constraint_name=cu.constraint_name and tc.constraint_type='PRIMARY KEY') pk ON pk.table_schema=c.table_schema AND pk.table_name=c.table_name AND pk.column_name=c.column_name WHERE c.table_name = 'shopData' AND c.table_schema = 'public'
Executing (default): SELECT DISTINCT tc.constraint_name as constraint_name, tc.constraint_schema as constraint_schema, tc.constraint_catalog as constraint_catalog, tc.table_name as table_name,tc.table_schema as table_schema,tc.table_catalog as table_catalog,kcu.column_name as column_name,ccu.table_schema  AS referenced_table_schema,ccu.table_catalog  AS referenced_table_catalog,ccu.table_name  AS referenced_table_name,ccu.column_name AS referenced_column_name FROM information_schema.table_constraints AS tc JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name WHERE constraint_type = 'FOREIGN KEY' AND tc.table_name = 'shopData' AND tc.table_catalog = 'sequalizedemo'
Executing (default): ALTER TABLE "public"."shopData" ADD COLUMN "addressId" INTEGER REFERENCES "shopData" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
(node:2980) UnhandledPromiseRejectionWarning: SequelizeDatabaseError: foreign key constraint "shopData_addressId_fkey" cannot be implemented
    at Query.formatError (C:\Users\DEALWITHIT\Documents\dev\bakerlyApi\node_modules\sequelize\lib\dialects\postgres\query.js:386:16)
    at Query.run (C:\Users\DEALWITHIT\Documents\dev\bakerlyApi\node_modules\sequelize\lib\dialects\postgres\query.js:87:18)
    at processTicksAndRejections (internal/process/task_queues.js:97:5)
(node:2980) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
(node:2980) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.




Executing (default): SELECT pk.constraint_type as "Constraint",c.column_name as "Field", c.column_default as "Default",c.is_nullable as "Null", (CASE WHEN c.udt_name = 'hstore' THEN c.udt_name ELSE c.data_type END) || (CASE WHEN c.character_maximum_length IS NOT NULL THEN '(' || c.character_maximum_length || ')' ELSE '' END) as "Type", (SELECT array_agg(e.enumlabel) FROM pg_catalog.pg_type t JOIN pg_catalog.pg_enum e ON t.oid=e.enumtypid WHERE t.typname=c.udt_name) AS "special", (SELECT pgd.description FROM pg_catalog.pg_statio_all_tables AS st INNER JOIN pg_catalog.pg_description pgd on (pgd.objoid=st.relid) WHERE c.ordinal_position=pgd.objsubid AND c.table_name=st.relname) AS "Comment" FROM information_schema.columns c LEFT JOIN (SELECT tc.table_schema, tc.table_name, cu.column_name, tc.constraint_type FROM information_schema.TABLE_CONSTRAINTS tc JOIN information_schema.KEY_COLUMN_USAGE  cu ON tc.table_schema=cu.table_schema and tc.table_name=cu.table_name and tc.constraint_name=cu.constraint_name and tc.constraint_type='PRIMARY KEY') pk ON pk.table_schema=c.table_schema AND pk.table_name=c.table_name AND pk.column_name=c.column_name WHERE c.table_name = 'districts' AND c.table_schema = 'public'
Executing (default): SELECT DISTINCT tc.constraint_name as constraint_name, tc.constraint_schema as constraint_schema, tc.constraint_catalog as constraint_catalog, tc.table_name as table_name,tc.table_schema as table_schema,tc.table_catalog as table_catalog,kcu.column_name as column_name,ccu.table_schema  AS referenced_table_schema,ccu.table_catalog  AS referenced_table_catalog,ccu.table_name  AS referenced_table_name,ccu.column_name AS referenced_column_name FROM information_schema.table_constraints AS tc JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name WHERE constraint_type = 'FOREIGN KEY' AND tc.table_name = 'districts' AND tc.table_catalog = 'sequalizedemo'
Executing (default): ALTER TABLE "districts" ALTER COLUMN "name" DROP NOT NULL;ALTER TABLE "districts" ALTER COLUMN "name" DROP DEFAULT;ALTER TABLE "districts" ALTER COLUMN "name" TYPE VARCHAR(255);
Executing (default): ALTER TABLE "districts" ALTER COLUMN "province" DROP NOT NULL;ALTER TABLE "districts" ALTER COLUMN "province" DROP DEFAULT;ALTER TABLE "districts" ALTER COLUMN "province" TYPE VARCHAR(255);
Executing (default): ALTER TABLE "districts" ALTER COLUMN "createdAt" SET NOT NULL;ALTER TABLE "districts" ALTER COLUMN "createdAt" DROP DEFAULT;ALTER TABLE "districts" ALTER COLUMN "createdAt" TYPE TIMESTAMP WITH TIME ZONE;
Executing (default): ALTER TABLE "districts" ALTER COLUMN "updatedAt" SET NOT NULL;ALTER TABLE "districts" ALTER COLUMN "updatedAt" DROP DEFAULT;ALTER TABLE "districts" ALTER COLUMN "updatedAt" TYPE TIMESTAMP WITH TIME ZONE;
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'districts' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): CREATE TABLE IF NOT EXISTS "users" ("id" UUID NOT NULL UNIQUE , "name" VARCHAR(255), "email" VARCHAR(255) NOT NULL UNIQUE, "password" VARCHAR(255), "active" BOOLEAN DEFAULT true, "source" VARCHAR(255), 
"avatarUrl" VARCHAR(255), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "districtCode" INTEGER REFERENCES "districts" ("code") ON DELETE SET NULL ON UPDATE CASCADE, PRIMARY KEY ("id"));
Executing (default): SELECT pk.constraint_type as "Constraint",c.column_name as "Field", c.column_default as "Default",c.is_nullable as "Null", (CASE WHEN c.udt_name = 'hstore' THEN c.udt_name ELSE c.data_type END) || (CASE WHEN c.character_maximum_length IS NOT NULL THEN '(' || c.character_maximum_length || ')' ELSE '' END) as "Type", (SELECT array_agg(e.enumlabel) FROM pg_catalog.pg_type t JOIN pg_catalog.pg_enum e ON t.oid=e.enumtypid WHERE t.typname=c.udt_name) AS "special", (SELECT pgd.description FROM pg_catalog.pg_statio_all_tables AS st INNER JOIN pg_catalog.pg_description pgd on (pgd.objoid=st.relid) WHERE c.ordinal_position=pgd.objsubid AND c.table_name=st.relname) AS "Comment" FROM information_schema.columns c LEFT JOIN (SELECT tc.table_schema, tc.table_name, cu.column_name, tc.constraint_type FROM information_schema.TABLE_CONSTRAINTS tc JOIN information_schema.KEY_COLUMN_USAGE  cu ON tc.table_schema=cu.table_schema and tc.table_name=cu.table_name and tc.constraint_name=cu.constraint_name and tc.constraint_type='PRIMARY KEY') pk ON pk.table_schema=c.table_schema AND pk.table_name=c.table_name AND pk.column_name=c.column_name WHERE c.table_name = 'users' AND c.table_schema = 'public'
Executing (default): SELECT DISTINCT tc.constraint_name as constraint_name, tc.constraint_schema as constraint_schema, tc.constraint_catalog as constraint_catalog, tc.table_name as table_name,tc.table_schema as table_schema,tc.table_catalog as table_catalog,kcu.column_name as column_name,ccu.table_schema  AS referenced_table_schema,ccu.table_catalog  AS referenced_table_catalog,ccu.table_name  AS referenced_table_name,ccu.column_name AS referenced_column_name FROM information_schema.table_constraints AS tc JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name WHERE constraint_type = 'FOREIGN KEY' AND tc.table_name = 'users' AND tc.table_catalog = 'sequalizedemo'
Executing (default): ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL;ALTER TABLE "users" ALTER COLUMN "name" DROP DEFAULT;ALTER TABLE "users" ALTER COLUMN "name" TYPE VARCHAR(255);
Executing (default): ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;ALTER TABLE "users" ALTER COLUMN "email" DROP DEFAULT;ALTER TABLE "users"  ADD UNIQUE ("email");ALTER TABLE "users" ALTER COLUMN "email" TYPE VARCHAR(255)  ;


*/
