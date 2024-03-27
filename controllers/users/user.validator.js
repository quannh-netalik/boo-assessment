const expressValidator = require("express-validator");

const validate = [
  expressValidator
    .body("name")
    .isString()
    .notEmpty()
    .withMessage("name is required"),
];

module.exports = {
  validate,
};
