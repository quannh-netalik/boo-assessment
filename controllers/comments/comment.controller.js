const express = require("express");

const { commentService } = require("../../services");
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
const postComment = async (req, res) => {
  const { comment, err } = await commentService.postComment(req.body);
  if (err) {
    return res.status(errors.serverError.status).send(errors.serverError);
  }

  return res.status(201).send(comment);
};

module.exports = {
  listComments,
  postComment,
};
