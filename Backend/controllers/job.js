const Job = require("../models/Job");

const createJob = async (req, res) => {
  const { title, description, category, budget, deadline } = req.body;

  if (!title || !description || !category || !budget || !deadline) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const job = new Job({
    title,
    description,
    category,
    budget,
    deadline,
  });

  //Auto apply

  try {
    await job.save();
    res.status(201).json({ message: "Job created successfully", job });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const applyJob = async (req, res) => {
  const { jobID, workerID } = req.body;

  if (!jobID || !workerID) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const job = await Job.findOne(jobID);
    job.applicants.push(workerID);
    await job.save();
    res.status(200).json({ message: "Applied successfully", job });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createJob, applyJob };