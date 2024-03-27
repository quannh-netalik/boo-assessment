const mongoose = require("mongoose");

const { MBTIValues, ENNEAGRAM } = require("../constant");

const ProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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
    variant: {
      type: String,
      required: true,
    },
    tritype: {
      type: Number,
      required: true,
    },
    socionics: {
      type: String,
      required: true,
    },
    sloan: {
      type: String,
      required: true,
    },
    psyche: {
      type: String,
      required: true,
    },
    temperaments: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
      default: "https://soulverse.boo.world/images/1.png",
    },
  },
  { timestamps: true }
);

exports.Profile = mongoose.model("profiles", ProfileSchema);
