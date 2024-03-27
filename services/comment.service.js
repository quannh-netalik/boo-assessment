const { Comment } = require("../models");

/**
 * @param {Object} data
 * @returns {Promise<Comment>}
 */
const postComment = async (data) => {
  try {
    const comment = await Comment.create(data);
    return { comment };
  } catch (err) {
    return { err };
  }
};

module.exports = {
  postComment,
};
