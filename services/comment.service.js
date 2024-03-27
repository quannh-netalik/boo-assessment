const { Comment } = require("../models");

const _queryBuilder = (query) => {
  const _query = {
    ...(query.profileId && { profileId: query.profileId }),
    ...(query.mbti && { mbti: query.mbti }),
    ...(query.enneagram && { enneagram: query.enneagram }),
    ...(query.zodiac && { zodiac: query.zodiac }),
    ...(query.userId && { userId: query.userId }),
  };
  
  return _query;
};

/**
 * @param {Object} query
 * @returns {Promise<Comment[]>}
 */
const listComments = async (query) => {
  const _query = _queryBuilder(query);
  try {
    const comments = await Comment.find(_query);
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
