// const db = require("./dbFunctions/puchase");
const user = require("./dbFunctions/user");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

let salt = bcrypt.genSaltSync(saltRounds);
let hash = bcrypt.hashSync("123", salt);
console.log(hash);

// createAdmin();
// createCustomer();

// async function createAdmin() {
//   let salt = bcrypt.genSaltSync(saltRounds);
//   let hash = bcrypt.hashSync("123", salt);

//   try {
//     await user.createUser({
//       email: "meriell@rosan.com",
//       password: hash,
//       name: "meriell rosan",
//       userType: "admin",
//       source: "emailAndPassword",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }
// async function createCustomer() {
//   try {
//     let salt = bcrypt.genSaltSync(saltRounds);
//     let hash = bcrypt.hashSync("123", salt);

//     await user.createUser({
//       email: "tylor@swift.com",
//       password: hash,
//       name: "tylor swift",
//       userType: "customer",
//       source: "emailAndPassword",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

// // db.createPurchase({
// //   purchasedBy: "681c333a-616e-494b-81e8-ff90502fb2b1",
// //   courseId: "2e38f34f-ab02-4e4a-88f2-ebb5da2b8a64",
// //   amount: 10,
// // });
