const express = require("express");

const { validateRequest } = require("../middlewares/validator");
const { commentValidator, commentController } = require("../controllers");

const router = express.Router();

/**
 *
 * @param {express.Router} prefix
 */
const commentRouter = (prefix) => {
  prefix.use("/comment", router);

  router.get("/", commentController.listComments);

  router.post(
    "/:_id/like",
    commentValidator.validateLikeComment,
    validateRequest,
    commentController.likeComment
  );

  router.post(
    "/",
    commentValidator.validatePostComment,
    validateRequest,
    commentController.postComment
  );
};

module.exports = commentRouter;
