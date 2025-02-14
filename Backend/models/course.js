const mongoose = require("mongoose");
const moduleSchema = require("./module");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    duration: { type: Number, required: true },
    modules: [typeof moduleSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
