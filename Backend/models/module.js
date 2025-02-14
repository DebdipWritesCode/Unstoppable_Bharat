const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    resources: [
      {
        title: { type: String, required: true },
        link: { type: String, required: true },
      },
    ],
    quiz: [
      {
        question: { type: String, required: true },
        options: { type: [String], required: true },
        answer: { type: String, required: true },
      },
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Module", moduleSchema);
