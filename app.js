const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const { OAuth2Client } = require("google-auth-library");
// const {
//   GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET,
//   SESSION_SECRET,
// } = require("./cofig/config");
// const googleOAuthClient = new OAuth2Client(GOOGLE_CLIENT_ID);

const PORT = process.env.PORT || 3001;
const app = express();

const db = require("./models");

// const itenRoutes = require("./routes/item.route");

app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync({ alter: true });

app.get("/", (req, res) => {
  res.json({ message: "bakerly" });
});

app.use("/auth", require("./routes/auth/login.router"));
app.use("/auth", require("./routes/auth/signup.router")); //dont add jwt middleware
// app.use("/reg", require("./routes/register/register.router")); //dont add jwt middleware

app.get("/findall", async (req, res) => {
  let users = await userRoutes.findAllUsersWithDistrict();
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
