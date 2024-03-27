const { User } = require("../models");

/**
 * @returns {Promise<User[]>}
 */
const listUsers = async () => {
  try {
    const users = await User.find();
    return { users };
  } catch (err) {
    return { err };
  }
};

const getUserById = async (_id) => {
  try {
    const user = await User.findById(_id);
    return { user };
  } catch (err) {
    return { err };
  }
};

/**
 * @param {Object} data
 * @returns {Promise<User>}
 */
const createUser = async (data) => {
  try {
    const user = await User.create(data);
    return { user };
  } catch (err) {
    return { err };
  }
};

module.exports = {
  listUsers,
  getUserById,
  createUser,
};
