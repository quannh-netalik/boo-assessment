const express = require("express");

const { validateRequest } = require("../middlewares/validator");
const { profileValidator, profileController } = require("../controllers");

const router = express.Router();

/**
 *
 * @param {express.Router} prefix
 */
const profileRouter = (prefix) => {
  prefix.use("/profile", router);

  router.get("/:_id", profileController.getProfileById);

  router.get("/", profileController.listProfile);

  router.post(
    "/",
    profileValidator.validate,
    validateRequest,
    profileController.createProfile
  );
};

module.exports = profileRouter;
