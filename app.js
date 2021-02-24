const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const Sentry = require('@sentry/node');
// const Tracing = require("@sentry/tracing");

const PORT = process.env.PORT || 3001;
const app = express();

// Sentry.init({
//   dsn: "https://313ec29e40ac419fb69d3a9ba3189edb@o516292.ingest.sentry.io/5622667",
//   integrations: [
//     // enable HTTP calls tracing
//     new Sentry.Integrations.Http({ tracing: true }),
//     // enable Express.js middleware tracing
//     new Tracing.Integrations.Express({ app }),
//   ],

//   // We recommend adjusting this value in production, or using tracesSampler
//   // for finer control
//   tracesSampleRate: 1.0,
// });

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
// app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
// app.use(Sentry.Handlers.tracingHandler());
// const db = require("./models");

const userdb = require("./dbFunctions/user");
// im
const { jwtAuthMiddleware } = require("./middleware/jwtauth");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.get("/debug-sentry", function mainHandler(req, res) {
//   throw new Error("My first Sentry error!");
// });

// app.use(Sentry.Handlers.errorHandler());

// // Optional fallthrough error handler
// app.use(function onError(err, req, res, next) {
//   // The error id is attached to `res.sentry` to be returned
//   // and optionally displayed to the user for support.
//   res.statusCode = 500;
//   res.end(res.sentry + "\n");
// });
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
app.use("/api/course", jwtAuthMiddleware, require("./routes/course/course.router")); // use jwt middleware
app.use("/api/lesson", jwtAuthMiddleware , require("./routes/lesson/lesson.router")); // use jwt middleware
// app.use("/reg", require("./routes/register/register.router")); //dont add jwt middleware
// app.use("/api/shop", require("./routes/public/shop.router")); // use jwt middleware
console.log("blaaaaaaaaaaaaaaa")
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
