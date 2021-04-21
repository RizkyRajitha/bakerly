const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const uuid = require("uuid").v4;
const redis = require("../../redis/redis");

const jwtsecret = "123";

const User = require("../../dbFunctions/user");

exports.loginwemail = async (req, res) => {
  console.log(req.body);
  console.log("user login");
  try {
    let user = await User.findUserByEmail(req.body.email, ["id", "password"]);

    let state = bcrypt.compareSync(req.body.password, user.password);

    console.log(state);
    console.log(user);
    if (!state) {
      res.status(401).json({ success: false, msg: "invalid_password" });
      return;
    }

    try {
      let ses = await redis.getSession(user.id);
      console.log(ses);

      if (ses.success) {
        console.log("2 users from same creds");
        let state = await redis.removeSession(user.id);
        console.log(state);
      }
      let sesId = uuid();
      console.log(sesId);
      let newSession = await redis.setSession(user.id, sesId);
      console.log(newSession);

      let token = jwt.sign(
        {
          email: user.email,
          id: user.id,
          sessionId: sesId,
        },
        jwtsecret,
        { expiresIn: "600m" }
      );
      res.status(200).json({ success: true, token: token, sesId });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        msg: "error_creating_session",
        err: error,
      });
    }

    redis.getAllSession();
  } catch (error) {
    console.log(error);
    if (error.code === 404) {
      res.status(400).json({ success: false, msg: "invalid_email" });
      return;
    }
    res.status(500).json({ success: false, msg: error });
  }
};
