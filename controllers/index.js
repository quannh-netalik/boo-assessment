// Profile
const profileController = require("./profiles/profile.controller");
const profileValidator = require("./profiles/profile.validator");

// Comment

// User
const userController = require("./users/user.controller");
const userValidator = require("./users/user.validator");

module.exports = {
  profileValidator,
  profileController,
  userController,
  userValidator,
};
