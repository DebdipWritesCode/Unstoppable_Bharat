const path = require("path");
const multer = require("multer");
const Worker = require("../models/worker");
const URL = "http://localhost:8000";
const axios = require("axios");

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

    if (!req.file) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    const newWorker = new Worker({
      user_id,
      profession,
      highest_education,
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

  if(!userID) {
    return res.status(400).json({ message: "All fields are required" });
  }
  
  try {
    const worker = await Worker.findOne(userID).populate("userID");

    if(!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    const query = `?profession=${worker.profession}&highest_education=${worker.highestEducation}&other_skills=${worker.other_skills}&soft_skills=${soft_skills}`;
    const response = await axios.post(`${URL}/query` + query);

    res.status(200).json(response.data);

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const chat = async (req, res) => {
  const { userID, workerID, user_input } = req.body;

  if(!userID || !workerID || !user_input) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const worker = await Worker.findOne(workerID);

    if(!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    const response = await axios.post(`${URL}/chat`, user_input);
    res.status(200).json(response.data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  upload,
  save_worker,
  recommendations,
  chat,
};
