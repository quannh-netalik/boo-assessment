"use strict";

const express = require("express");
const profileRouter = require("./profile.route");
const commentRoute = require("./comment.route");
const userRoute = require("./user.route");

const router = express.Router();
const pathRegistrar = [profileRouter, commentRoute, userRoute];

module.exports = function () {
  pathRegistrar.forEach((path) => path(router));

  return router;
};
