const express = require("express");

const { userService } = require("../../services");
const errors = require("../../errors");

/**
 * @param {express.Request} req
 * @param  {express.Response} res
 */
const listUser = async (_, res) => {
  const { users, err } = await userService.listUsers();
  if (err) {
    return res.status(errors.serverError.status).send(errors.serverError);
  }

  return res.status(200).send(users);
};

/**
 * @param {express.Request} req
 * @param  {express.Response} res
 */
const createUser = async (req, res) => {
  const { user, err } = await userService.createUser(req.body);
  if (err) {
    return res.status(errors.serverError.status).send(errors.serverError);
  }

  return res.status(200).send(user);
};

module.exports = {
  listUser,
  createUser,
};
