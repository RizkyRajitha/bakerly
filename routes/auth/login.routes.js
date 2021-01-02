const jwt = require("jsonwebtoken");
const jwtsecret = "123";
// process.env.jwtsecret || require("../../config/env").jwtsecret;

const User = require("../../dbFunctions/user");

exports.loginwemail = async (req, res) => {
  let user = User.findUserByEmail(req.body.email);

  //   console.log(req.body);

  //   User.findOne({ email: req.body.email })
  //     .then((doc) => {
  //       console.log(doc);

  //       var state = bcrypt.compareSync(req.body.password, doc.hash);

  //       console.log(state);

  //       if (state) {
  //         var token = jwt.sign(
  //           {
  //             email: doc.email,
  //             id: doc._id,
  //             type: "regular",
  //           },
  //           jwtsecret,
  //           { expiresIn: "600m" }
  //         );

  //         res.status(200).json({ msg: "success", token: token });
  //       } else {
  //         res.status(401).json({ msg: "invalidcredentials" });
  //       }
  //     })
  //     .catch((err) => {
  //       res.status(401).json({ msg: "nouser" });
  //     });
  //   if (process.env.NODE_ENV === "production") {
  //     util.utilfunc(
  //       req.headers["x-forwarded-for"] || req.connection.remoteAddress
  //     );
  //   } else {
  //   }
};
