const User = require("../dbFunctions/user");

function roleRestrictMiddleware(role = []) {
  return async function (req, res, next) {
    let user = await User.findUserById(res.locals.id);

    console.log(user);

    console.log(role);
    console.log("going through role restric ");
    console.log(res.locals.id);

    let isWhiteListed = role.includes(user.userType);
    console.log(isWhiteListed);

    if (!isWhiteListed) {
      res.status(401).json({
        success: false,
        msg: "this route is forbidden for your user type",
      });
      return;
    }

    if (!user.active) {
      res.status(401).json({
        success: false,
        msg: "this user is inactive",
      });
      return;
    }

    res.locals.userType = user.userType;
    next();
  };
}

// const roleRestrictMiddleware = (req, res, next) => {

// console.log("roleRestrict Middleware");
// const token = req.headers.authorization;
// console.log(token);

// if (token) {
//   jwt.verify(token, jwtsecret, (err, decoded) => {
//     if (err) {
//       console.log(err);
//       return res
//         .status(401)
//         .json({ error: true, message: "unauthorized_access" });
//     }
//     req.id = decoded.id;
//     next();
//     //   var ipaddr =
//     //     req.headers["x-forwarded-for"] || req.connection.remoteAddress;
//   });
// } else {
//   return res.status(403).send({
//     error: true,
//     message: "no_token_provided.",
//   });
// }
// };

module.exports.roleRestrictMiddleware = roleRestrictMiddleware;
