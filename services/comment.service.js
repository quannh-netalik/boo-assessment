const mongoose = require("mongoose");
const { Comment, Like } = require("../models");

/**
 *
 * @param {Object} query
 * @param {Array} aggregates
 */
const _queryBuilder = (query, aggregates) => {
  if (query.profileId) {
    aggregates.push({ $match: { profileId: query.profileId } });
  }
  if (query.mbti) {
    aggregates.push({ $match: { mbti: query.mbti } });
  }
  if (query.enneagram) {
    aggregates.push({ $match: { enneagram: query.enneagram } });
  }
  if (query.zodiac) {
    aggregates.push({ $match: { zodiac: query.zodiac } });
  }
  if (query.userId) {
    aggregates.push({ $match: { userId: query.userId } });
  }
};

/**
 *
 * @param {Object} query
 * @param {Array} aggregates
 */
const _sortBuilder = (sort, aggregates) => {
  // Sort
  // required format: ?sort[field]=(1 | -1)&...
  // ex: sort[createdAt]=1
  // default sort createdAt descending
  aggregates.push({
    $sort: {
      createdAt: sort.createdAt ? Number(sort.createdAt) : -1,
    },
  });

  if (sort.numberOfLike) {
    aggregates.push({
      $sort: {
        numberOfLike: Number(sort.numberOfLike),
      },
    });
  }

  if (sort.mbti) {
    aggregates.push({
      $sort: {
        mbti: Number(sort.mbti),
      },
    });
  }
};

/**
 * @returns {Promise<Comment>}
 */
const getCommentById = async (_id) => {
  try {
    const comment = await Comment.findById(_id);
    return { comment };
  } catch (err) {
    return { err };
  }
};

/**
 * @param {Object} query
 * @returns {Promise<Comment[]>}
 */
const listComments = async (query) => {
  const aggregates = [];

  // build query
  _queryBuilder(query, aggregates);

  if (query.sort) {
    // build sort
    _sortBuilder(query.sort, aggregates);
  }

  // Join profiles collection then unwind
  aggregates.push({
    $lookup: {
      from: "profiles",
      localField: "profileId",
      foreignField: "_id",
      as: "profile",
    },
  });
  aggregates.push({ $unwind: "$profile" });

  // Join users collection then unwind
  aggregates.push({
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user",
    },
  });
  aggregates.push({ $unwind: "$user" });

  // Field selection
  aggregates.push({
    $project: {
      content: 1,
      mbti: 1,
      enneagram: 1,
      numberOfLike: 1,
      zodiac: 1,
      "user._id": 1,
      "user.name": 1,
      "profile._id": 1,
      "profile.name": 1,
      "profile.mbti": 1,
      "profile.enneagram": 1,
      "profile.image": 1,
      createdAt: 1,
    },
  });

  try {
    const comments = await Comment.aggregate(aggregates);
    return { comments };
  } catch (err) {
    return { err };
  }
};

/**
 *
 * @param {String} commentId
 * @returns {Promise<Like[]>}
 */
const listLikeComment = async (commentId) => {
  try {
    const comments = await Like.find({
      commentId,
    });
    return { comments };
  } catch (err) {
    return { err };
  }
};

/**
 * @typedef {Object} Data
 * @property {String} commentId
 * @property {String} userId
 * @param {Data} data
 * @returns {Like}
 */
const likeComment = async (data) => {
  try {
    const { comment, err } = await getCommentById(data.commentId);
    if (!comment || err) {
      return { comment: null };
    }

    /**
     * Cannot use transaction cause quite complicated to setup replica for mongodb
     */

    // 1. Check whether like record has been created
    const _like = await Like.findOne({
      commentId: comment._id,
      userId: data.userId,
    });

    // 2. If record found
    // -> remove from comment
    // -> delete like record
    if (!!_like) {
      const updatedComment = await Comment.findOneAndUpdate(
        { _id: comment._id },
        {
          $inc: {
            numberOfLike: -1,
          },
          $pull: {
            likeIds: _like._id,
          },
        },
        { new: true }
      );
      await Like.deleteOne({ _id: _like._id });

      return { comment: updatedComment };
    }

    // 3. If record not existed -> create like record then attach to comment
    const like = await Like.create(data);
    const updatedComment = await Comment.findOneAndUpdate(
      { _id: comment._id },
      {
        $inc: {
          numberOfLike: 1,
        },
        $push: {
          likeIds: like._id,
        },
      },
      { new: true }
    );
    return { comment: updatedComment };
  } catch (err) {
    console.log(err);
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
  likeComment,
  listLikeComment,
  postComment,
};
