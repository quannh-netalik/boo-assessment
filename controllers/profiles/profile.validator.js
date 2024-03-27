const { body } = require("express-validator");
const { MBTIValues, ENNEAGRAM } = require("../../constant");

const validateCreateProfile = [
  body("name").isString().notEmpty().withMessage("name is required"),
  body("description")
    .isString()
    .notEmpty()
    .withMessage("description is required"),
  body("mbti").isIn(MBTIValues).notEmpty().withMessage("mbti is required"),
  body("enneagram")
    .isIn(ENNEAGRAM)
    .notEmpty()
    .withMessage("enneagram is required"),
  body("variant").isString().notEmpty().withMessage("variant is required"),
  body("tritype").isNumeric().notEmpty().withMessage("tritype is required"),
  body("socionics").isString().notEmpty().withMessage("socionics is required"),
  body("sloan").notEmpty().withMessage("sloan is required"),
  body("psyche").notEmpty().withMessage("psyche is required"),
  body("temperaments")
    .isString()
    .notEmpty()
    .withMessage("temperaments is required"),
];

module.exports = {
  validateCreateProfile,
};
