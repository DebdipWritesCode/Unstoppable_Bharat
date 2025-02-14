const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    providerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [String],
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Worker" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
