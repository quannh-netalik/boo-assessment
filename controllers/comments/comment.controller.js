const express = require("express");

const {
  commentService,
  userService,
  profileService,
} = require("../../services");
const errors = require("../../errors");

/**
 * @param {express.Request} req
 * @param  {express.Response} res
 */
const listComments = async (req, res) => {
  const { comments, err } = await commentService.listComments(req.query);
  if (err) {
    return res.status(errors.serverError.status).send(errors.serverError);
  }

  return res.status(200).send(comments);
};

/**
 * @param {express.Request} req
 * @param  {express.Response} res
 */
const listLikeComment = async (req, res) => {
  const commentId = req.params._id;

  if (!isValidObjectId(commentId)) {
    return res
      .status(errors.invalidObjectId.status)
      .send(errors.invalidObjectId);
  }

  const { likes, err } = await commentService.listLikeComment(commentId);

  if (err) {
    return res.status(errors.serverError.status).send(errors.serverError);
  }

  return res.status(200).send(likes);
};

/**
 * @param {express.Request} req
 * @param  {express.Response} res
 */
const likeComment = async (req, res) => {
  const commentId = req.params._id;
  const userId = req.body.userId;

  const [usr, cmt] = await Promise.all([
    userService.getUserById(userId),
    commentService.getCommentById(commentId),
  ]);

  if (usr.err || cmt.err) {
    return res.status(errors.serverError.status).send(errors.serverError);
  }

  if (!usr.user) {
    return res.status(errors.userNotFound.status).send(errors.userNotFound);
  }

  if (!cmt.comment) {
    return res
      .status(errors.commentNotFound.status)
      .send(errors.commentNotFound);
  }

  const { comment, err } = await commentService.likeComment({
    commentId,
    userId,
  });

  if (!comment) {
    return res
      .status(errors.commentNotFound.status)
      .send(errors.commentNotFound);
  }

  if (err) {
    return res.status(errors.serverError.status).send(errors.serverError);
  }

  return res.status(201).send(comment);
};

/**
 * @param {express.Request} req
 * @param  {express.Response} res
 */
const postComment = async (req, res) => {
  const [usr, prf] = await Promise.all([
    userService.getUserById(req.body.userId),
    profileService.getProfileById(req.body.profileId),
  ]);
  if (usr.err || prf.err) {
    return res.status(errors.serverError.status).send(errors.serverError);
  }

  if (!usr.user) {
    return res.status(errors.userNotFound.status).send(errors.userNotFound);
  }

  if (!prf.profile) {
    return res
      .status(errors.profileNotFound.status)
      .send(errors.profileNotFound);
  }

  const { comment, err } = await commentService.postComment(req.body);
  if (err) {
    return res.status(errors.serverError.status).send(errors.serverError);
  }

  return res.status(201).send(comment);
};

module.exports = {
  listComments,
  postComment,
  listLikeComment,
  likeComment,
};
