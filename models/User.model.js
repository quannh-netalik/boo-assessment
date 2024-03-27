const mongoose = require("mongoose");

// The only attribute needed for user accounts is name
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

exports.User = mongoose.model("users", UserSchema);
