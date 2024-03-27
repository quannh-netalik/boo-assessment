const { Profile } = require("../models");

/**
 *
 * @param {String} _id
 * @returns {Promise<Profile>}
 */
const getProfileById = async (_id) => {
  try {
    const profile = await Profile.findById(_id);
    return { profile };
  } catch (err) {
    return { err };
  }
};

/**
 *  @returns {Promise<Profile[]>}
 */
const listProfile = async () => {
  try {
    const profiles = await Profile.find();
    return { profiles };
  } catch (err) {
    return { err };
  }
}

/**
 *
 * @param {Object} _id
 * @returns {Promise<Profile>}
 */
const createProfile = async (data) => {
  try {
    const profile = await Profile.create(data);
    return { profile };
  } catch (err) {
    return { err };
  }
};

module.exports = {
  getProfileById,
  listProfile,
  createProfile,
};
