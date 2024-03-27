const express = require("express");

const { validateRequest } = require("../middlewares/validator");
const { profileValidator, profileController } = require("../controllers");

const router = express.Router();

/**
 *
 * @param {express.Router} prefix
 */
const commentRouter = (prefix) => {
  prefix.use("/comment", router);
};

module.exports = commentRouter;
