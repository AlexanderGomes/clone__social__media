const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add your name"],
    },
    username: {
      type: String,
      required: [true, "please add your username"],
    },
    email: {
      type: String,
      required: [true, "Please add your email"],
    },
    password: {
      type: String,
      required: [true, "Please add your password"],
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    desc: {
      type: String,
      max: 50,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
