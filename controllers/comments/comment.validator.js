const { body } = require("express-validator");
const { MBTIValues, ENNEAGRAM, ZODIAC } = require("../../constant");

const validatePostComment = [
  body("content").isString().notEmpty().withMessage("content is required"),
  body("profileId").isMongoId().notEmpty().withMessage("profileId is required"),
  body("mbti").isIn(MBTIValues).notEmpty().withMessage("mbti is required"),
  body("enneagram")
    .isIn(ENNEAGRAM)
    .notEmpty()
    .withMessage("enneagram is required"),
  body("zodiac").isIn(ZODIAC).notEmpty().withMessage("zodiac is required"),
  body("userId").isMongoId().notEmpty().withMessage("userId is required"),
];

module.exports = {
  validatePostComment,
};
