const validator = require("validator").default;

const loginValidator = (req, res, next) => {
  console.log("validator");

  let { email, password } = req.body;
  console.log(email, password);
  if (email && password) {
    if (validator.isEmail(email)) {
      res.status(400).json({ success: false, msg: "invalid email format" });
      return;
    }
    // if (validator.strinf(email)) {
    //   res.status(400).json({ success: false, msg: "invalid email format" });
    //   return;
    // }

    next();
  } else {
    res
      .status(400)
      .json({ success: false, msg: "required email and password" });
    return;
  }
};

module.exports.loginValidator = loginValidator;

// const jwtAuthMiddleware = (req, res, next) => {
//   console.log("jwtAuth middleware");
//   const token = req.headers.authorization;
//   console.log(token);

//   if (token) {
//     jwt.verify(token, jwtsecret, (err, decoded) => {
//       if (err) {
//         console.log(err);
//         return res
//           .status(401)
//           .json({ error: true, message: "unauthorized_access" });
//       }
//       res.locals.id = decoded.id;
//       next();
//       //   var ipaddr =
//       //     req.headers["x-forwarded-for"] || req.connection.remoteAddress;
//     });
//   } else {
//     return res.status(403).send({
//       error: true,
//       message: "no_token_provided.",
//     });
//   }
// };
