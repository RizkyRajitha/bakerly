const bcrypt = require("bcryptjs");
const saltRounds = 10;
const jwtsecret = "123";
const { OAuth2Client } = require("google-auth-library");
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SESSION_SECRET,
} = require("../../config/env");
const jwt = require("jsonwebtoken");
const googleOAuthClient = new OAuth2Client(GOOGLE_CLIENT_ID);
const User = require("../../dbFunctions/user");

exports.signupwemail = (req, res) => {
  console.log(req.body);

  let salt = bcrypt.genSaltSync(saltRounds);
  let hash = bcrypt.hashSync(req.body.password, salt);

  let user = {
    name: req.body.name,
    email: req.body.email,
    password: hash,
    source: "emailAndPassword",
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
      if (err.original.code == 23505) {
        let payload = { success: false, msg: "duplicate_user" };
        res.status(400).json(payload);
      } else {
        let payload = { success: false, msg: err.message };
        res.status(400).json(payload);
      }
    });
};

exports.signupwegoogle = async (req, res) => {
  console.log(req.body);
  console.log("google auth");

  try {
    let ticket = await googleOAuthClient.verifyIdToken({
      idToken: req.body.tokenId,
    });

    console.log(ticket);
    let user = {
      name: ticket.payload.name,
      email: ticket.payload.email,
      source: "googleAuth",
      avatarUrl: ticket.payload.picture,
    };
    console.log(user);
    User.createUser(user)
      .then((user) => {
        console.log(user);
        let token = jwt.sign(
          {
            email: user.email,
            id: user.id,
          },
          jwtsecret,
          { expiresIn: "600m" }
        );

        res.status(200).json({ success: true, token: token });
      })
      .catch((err) => {
        console.log(err);
        if (err.original.code == 23505) {
          User.findUserByEmail(user.email, ["email", "id"])
            .then((user) => {
              console.log(user);
              let token = jwt.sign(
                {
                  email: user.email,
                  id: user.id,
                },
                jwtsecret,
                { expiresIn: "600m" }
              );

              res.status(200).json({ success: true, token: token });
            })
            .catch((err) => {
              console.log(err);
              let payload = { success: false, msg: err.message };
              res.status(400).json(payload);
            });
        } else {
          let payload = { success: false, msg: err.message };
          res.status(400).json(payload);
        }
      });
  } catch (error) {
    let payload = { success: false, msg: err.message };
    res.status(400).json(payload);
  }
};
