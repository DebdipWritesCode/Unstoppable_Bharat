const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  highestEducation: {
    type: String,
    required: true,
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
  ]
}, { timestamps: true });

module.exports = mongoose.model("Worker", workerSchema);