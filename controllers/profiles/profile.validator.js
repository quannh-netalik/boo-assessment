const expressValidator = require("express-validator");
const { MBTIValues } = require("../../constant");

const validate = [
  expressValidator
    .body("name")
    .isString()
    .notEmpty()
    .withMessage("name is required"),
  expressValidator
    .body("description")
    .isString()
    .notEmpty()
    .withMessage("description is required"),
  expressValidator
    .body("mbti")
    .isIn(MBTIValues)
    .notEmpty()
    .withMessage("mbti is required"),
  expressValidator
    .body("enneagram")
    .isString()
    .notEmpty()
    .withMessage("enneagram is required"),
  expressValidator
    .body("variant")
    .isString()
    .notEmpty()
    .withMessage("variant is required"),
  expressValidator
    .body("tritype")
    .isNumeric()
    .notEmpty()
    .withMessage("tritype is required"),
  expressValidator
    .body("socionics")
    .isString()
    .notEmpty()
    .withMessage("socionics is required"),
  expressValidator.body("sloan").notEmpty().withMessage("sloan is required"),
  expressValidator.body("psyche").notEmpty().withMessage("psyche is required"),
  expressValidator
    .body("temperaments")
    .isString()
    .notEmpty()
    .withMessage("temperaments is required"),
];

module.exports = {
  validate,
};
