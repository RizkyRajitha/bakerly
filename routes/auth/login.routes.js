const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
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

    redis.redisClient.setex("wow", 3600, "nani", (err, reply) => {
      console.log(err);
      console.log(reply);
    });

    redis.redisClient.get("wow", (err, reply) => {
      console.log(err);
      console.log(reply);
    });

    if (state) {
      let token = jwt.sign(
        {
          email: user.email,
          id: user.id,
        },
        jwtsecret,
        { expiresIn: "600m" }
      );

      res.status(200).json({ success: true, token: token });
    } else {
      res.status(401).json({ success: false, msg: "invalid_password" });
    }
  } catch (error) {
    console.log(error);
    if (error.code === 404) {
      res.json({ success: false, msg: "invalid_email" });
    }
  }
};
