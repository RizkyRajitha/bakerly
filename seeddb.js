// const db = require("./dbFunctions/puchase");
const user = require("./dbFunctions/user");

createAdmin();
createCustomer();

async function createAdmin() {
  try {
    await user.createUser({
      email: "meriell@rosan.com",
      password: "123",
      name: "meriell rosan",
      userType: "admin",
      source: "emailAndPassword",
    });
  } catch (error) {
    console.log(error);
  }
}
async function createCustomer() {
  try {
    await user.createUser({
      email: "tylor@swift.com",
      password: "123",
      name: "tylor swift",
      userType: "customer",
      source: "emailAndPassword",
    });
  } catch (error) {
    console.log(error);
  }
}

// db.createPurchase({
//   purchasedBy: "681c333a-616e-494b-81e8-ff90502fb2b1",
//   courseId: "2e38f34f-ab02-4e4a-88f2-ebb5da2b8a64",
//   amount: 10,
// });
