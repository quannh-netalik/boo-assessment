const { Comment } = require("../models");

/**
 * @returns {Promise<Comment[]>}
 */
const listComments = async () => {
  try {
    const comments = await Comment.find();
    return { comments };
  } catch (err) {
    return { err };
  }
};

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
  listComments,
  postComment,
};
