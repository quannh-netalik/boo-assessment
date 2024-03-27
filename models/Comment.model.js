const mongoose = require("mongoose");

const { MBTIValues, ENNEAGRAM, ZODIAC } = require("../constant");

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "profiles",
      required: true,
    },
    mbti: {
      type: String,
      enum: MBTIValues,
      required: true,
    },
    enneagram: {
      type: String,
      enum: ENNEAGRAM,
      required: true,
    },
    zodiac: {
      type: String,
      enum: ZODIAC,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

exports.Comment = mongoose.model("comments", CommentSchema);
