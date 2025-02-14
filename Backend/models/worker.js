const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  profile_picture: {
    type: String,
    default: "default.jpg",
  },
  profession: {
    type: String,
    required: true,
  },
  highestEducation: {
    type: String,
    required: true,
  },
  other_skills: {
    type: String,
  },
  streak: {
    type: Number,
    default: 0,
  },
  learninngPath: [
    {
      courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
      progress: {
        type: Number,
        default: 0,
      }
    },
  ],
  settings: [
    {
      setting: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Worker", workerSchema);