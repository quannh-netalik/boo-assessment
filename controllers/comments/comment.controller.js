const express = require("express");

const { commentService } = require("../../services");
const errors = require("../../errors");

/**
 * @param {express.Request} req
 * @param  {express.Response} res
 */
const postComment = async (req, res) => {
  const { comment, err } = await commentService.postComment(req.body);
  if (err) {
    return res.status(errors.serverError.status).send(errors.serverError);
  }

  return res.status(200).send(comment);
};

module.exports = {
  postComment,
};
