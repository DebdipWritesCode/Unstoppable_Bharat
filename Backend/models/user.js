const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["provider", "worker"],
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model("User", userSchema);