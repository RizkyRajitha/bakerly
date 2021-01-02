const bcrypt = require("bcryptjs");
const saltRounds = 10;

const User = require("../../dbFunctions/user");

exports.signupwemail = (req, res) => {
  let salt = bcrypt.genSaltSync(saltRounds);
  let hash = bcrypt.hashSync(req.body.password, salt);

  let user = {
    name: req.body.name,
    email: req.body.email,
    password: hash,
    source: "emailAndPassword",
    districtCode: req.body.districtCode,
    shopnameid: req.body.shopnameid,
  };

  console.log(user);
  User.createUser(user)
    .then((user) => {
      console.log(user);
      let payload = { success: true, msg: "user_created" };
      res.json(payload);
    })
    .catch((err) => {
      console.log(err);
      //   console.log(err.original.code);
      if (err.original.code == 23505) {
        let payload = { success: false, msg: err.errors[0].message };
        res.status(400).json(payload);
      } else {
        let payload = { success: false, msg: err.message };
        res.status(400).json(payload);
      }
      //   console.log(err.errors[0].message); //23505
      //   console.log(err[]); //23505
    });
};
