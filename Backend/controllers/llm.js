const path = require("path");
const multer = require("multer");
const Worker = require("../models/worker");
const URL = "http://localhost:8000";
const axios = require("axios");
const { default: mongoose } = require("mongoose");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const save_worker = async (req, res) => {
  try {
    const { user_id, profession, highest_education, other_skills } = req.body;

    if (!user_id || !profession || !highest_education) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    const newWorker = new Worker({
      userID: user_id,
      profession,
      highestEducation: highest_education,
      other_skills: other_skills || "",
      profile_picture: req.file.path,
    });

    await newWorker.save();

    res
      .status(201)
      .json({ message: "Worker saved successfully", worker: newWorker });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const recommendations = async (req, res) => {
  const { userID, soft_skills } = req.body;

  const userIDObj = new mongoose.Types.ObjectId(userID);

  if (!userID) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const worker = await Worker.findOne({ userID: userIDObj }).populate(
      "userID"
    );

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    const data = {
      profession: worker.profession,
      education: worker.highestEducation,
      skills: worker.other_skills,
      soft_skills: soft_skills,
    };

    const response = await axios.post(`${URL}/query`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    res.status(200).json(response.data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const chat = async (req, res) => {
  const { userID, workerID, user_input } = req.body;

  if (!userID || !workerID || !user_input) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const worker = await Worker.findOne({ _id: workerID }).populate("userID");

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    const data = {
      user_input: user_input,
    };

    const response = await axios.post(`${URL}/chat`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    res.status(200).json(response.data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createModule = async (req, res) => {
  const { title, description, courseID } = req.body;
  const duration = "NA"

  if (!title || !description || !courseID) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const module = new Module({
    title,
    description,
    duration,
    courseID,
  });

  try {
    await module.save();
    res.status(201).json({ message: "Module created successfully", module });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

module.exports = {
  upload,
  save_worker,
  recommendations,
  chat,
};
