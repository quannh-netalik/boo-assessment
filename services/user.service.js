const { User } = require("../models");

const listUsers = async () => {
  try {
    const users = await User.find();
    return { users };
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
  createUser,
};
