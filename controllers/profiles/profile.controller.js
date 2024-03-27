const express = require("express");
const { isValidObjectId } = require("mongoose");

const { profileService } = require("../../services");
const errors = require("../../errors");

/**
 * @param {express.Request} req
 * @param  {express.Response} res
 */
const getProfileById = async (req, res) => {
  const _id = req.params._id;

  if (!isValidObjectId(_id)) {
    return res
      .status(errors.invalidObjectId.status)
      .send(errors.invalidObjectId);
  }

  const { profile, err } = await profileService.getProfileById(_id);

  if (err) {
    return res.status(errors.serverError.status).send(errors.serverError);
  }

  if (!profile) {
    return res
      .status(errors.profileNotFound.status)
      .send(errors.profileNotFound);
  }

  return res.status(200).send(profile);
};

/**
 * @param {express.Request} req
 * @param  {express.Response} res
 */
const listProfile = async (_, res) => {
  const { profiles, err } = await profileService.listProfile();

  if (err) {
    return res.status(errors.serverError.status).send(errors.serverError);
  }

  return res.status(200).send(profiles);
};

/**
 * @param {express.Request} req
 * @param  {express.Response} res
 */
const createProfile = async (req, res) => {
  const { profile, err } = await profileService.createProfile(req.body);
  if (err) {
    profileService.getProfileById;
    return res.status(errors.serverError.status).send(errors.serverError);
  }
  return res.status(201).send(profile);
};

module.exports = {
  getProfileById,
  listProfile,
  createProfile,
};
