const jwt = require("jsonwebtoken");
const jwtsecret = "123";

const roleRestrictMiddleware = (req, res, next) => {
  console.log("roleRestrict Middleware");
  const token = req.headers.authorization;
  console.log(token);

  if (token) {
    jwt.verify(token, jwtsecret, (err, decoded) => {
      if (err) {
        console.log(err);
        return res
          .status(401)
          .json({ error: true, message: "unauthorized_access" });
      }
      req.id = decoded.id;
      next();
      //   var ipaddr =
      //     req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    });
  } else {
    return res.status(403).send({
      error: true,
      message: "no_token_provided.",
    });
  }
};

module.exports.roleRestrictMiddleware = roleRestrictMiddleware;
