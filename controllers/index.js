// Profile
const profileController = require("./profiles/profile.controller");
const profileValidator = require("./profiles/profile.validator");

// Comment
const commentController = require("./comments/comment.controller");
const commentValidator = require("./comments/comment.validator");

// User
const userController = require("./users/user.controller");
const userValidator = require("./users/user.validator");

module.exports = {
  profileValidator,
  profileController,
  commentController,
  commentValidator,
  userController,
  userValidator,
};
