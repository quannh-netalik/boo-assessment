const express = require("express");

const { validateRequest } = require("../middlewares/validator");
const { userValidator, userController } = require("../controllers");

const router = express.Router();

/**
 *
 * @param {express.Router} prefix
 */
const userRoute = (prefix) => {
  prefix.use("/user", router);

  router.get("/", userController.listUser);

  router.post(
    "/",
    userValidator.validateCreateUser,
    validateRequest,
    userController.createUser
  );
};

module.exports = userRoute;
