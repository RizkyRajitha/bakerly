const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const app = express();

// const db = require("./models");

const userdb = require("./dbFunctions/user");
// im
const { jwtAuthMiddleware } = require("./middleware/jwtauth");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// db.sequelize.sync({ alter: true });

// function jwtAuth(req, res, next) {
//   console.log("jwtAuth middleware");
//   const token = req.headers.authorization;

//   if (token) {
//     jwt.verify(token, jwtsecret, function (err, decoded) {
//       if (err) {
//         console.log(err);
//         return res
//           .status(401)
//           .json({ error: true, message: "unauthorized_access" });
//       }
//       req.id = decoded.id;
//       req.email = decoded.email;
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
// }

app.use("/auth", require("./routes/auth/login.router")); //dont add jwt middleware
app.use("/auth", require("./routes/auth/signup.router")); //dont add jwt middleware
app.use("/api/user", jwtAuthMiddleware, require("./routes/user/user.router")); // use jwt middleware
app.use("/api/shop", jwtAuthMiddleware, require("./routes/shop/shop.router")); // use jwt middleware
app.use("/public/api/shop", require("./routes/public/shop.router")); // use jwt middleware
// app.use("/reg", require("./routes/register/register.router")); //dont add jwt middleware

app.get("/", (req, res) => {
  res.json({ message: "bakerly" });
});

app.get("/findall", async (req, res) => {
  let users = await userdb.findAllUsers()
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
