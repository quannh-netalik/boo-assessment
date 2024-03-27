const expressValidator = require('express-validator');

exports.validateRequest = (req, res, next) => {
  const errors = expressValidator.validationResult(req);
  if (errors.array().length > 0) {
      return res.status(400).send({
          statusCode: 400,
          message: errors.array(),
          data: {},
      });
  }

  return next();
};