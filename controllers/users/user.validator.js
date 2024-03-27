const { body } = require("express-validator");

const validateCreateUser = [
  body("name").isString().notEmpty().withMessage("name is required"),
];

module.exports = {
  validateCreateUser,
};
