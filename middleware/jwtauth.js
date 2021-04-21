const jwt = require("jsonwebtoken");
const redis = require("../redis/redis");
const jwtsecret = "123";

const jwtAuthMiddleware = (req, res, next) => {
  console.log("jwtAuth middleware");
  const token = req.headers.authorization;
  console.log(token);

  if (token) {
    jwt.verify(token, jwtsecret, async (err, decoded) => {
      if (err) {
        console.log(err);
        return res
          .status(401)
          .json({ error: true, message: "unauthorized_access" });
      }
      try {
        let ses = await redis.getSession(decoded.id);

        if (ses.success) {
          let sessionId = JSON.parse(ses.reply).sessionId;
          console.log(sessionId);
          console.log(decoded)

          if (decoded.sessionId !== sessionId) {
            console.log(" session duplicated");
            return res.status(403).send({
              error: true,
              message: "session_expired.",
            });
          }
          console.log("valid session");

          res.locals.id = decoded.id;
          next();
        } else {
          console.log(" no session found session timeout");
          return res.status(403).send({
            error: true,
            message: "session_timeout.",
          });
        }

        // console.log("valid session");

        // res.locals.id = decoded.id;
        // next();
      } catch (error) {
        return res.status(403).send({
          error: true,
          message: "session_error.",
        });
      }

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

module.exports.jwtAuthMiddleware = jwtAuthMiddleware;
