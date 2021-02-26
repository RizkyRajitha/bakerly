const validator = require("validator").default;

const signupValidator = (req, res, next) => {
  console.log("validator");

  let { email, password, name } = req.body;
  console.log(email, password);
  if (email && password && name) {
    if (!validator.isEmail(email)) {
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
      .json({ success: false, msg: "required email and password and name" });
    return;
  }
};

module.exports.signupValidator = signupValidator;
