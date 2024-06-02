const { body } = require("express-validator");



const signUpMiddleWare = [
  body("name", "Name Cannot less than three words").isLength({ min: 3 }),
  body("email", "Email is not valid").isEmail(),
  body("password", "Password length cannnot less than 6").isLength({
    min: 6,
  }),
];


const loginMiddleware =  [
  body("email", "Invalid email").isEmail(),
  body("password", "Password length cannnot less than 6").isLength({
    min: 6,
  }),
]


module.exports = {signUpMiddleWare,loginMiddleware}