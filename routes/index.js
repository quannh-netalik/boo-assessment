"use strict";

const express = require("express");
const profileRouter = require("./profile.route");
const commentRoute = require("./comment.route");
const userRoute = require("./user.route");

const router = express.Router();

module.exports = function () {
  /** /profile */
  profileRouter(router);

  /** /comment */
  commentRoute(router);

  /** /user */
  userRoute(router);

  return router;
};
