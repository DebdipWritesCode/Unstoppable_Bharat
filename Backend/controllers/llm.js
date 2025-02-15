const path = require("path");
const multer = require("multer");
const Worker = require("../models/worker");
const Module = require("../models/module");
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

    // Check if the profile picture is uploaded
    const profilePicturePath = req.file ? req.file.path : null; // Now access the file from req.file

    const newWorker = new Worker({
      userID: user_id,
      profession,
      highestEducation: highest_education,
      other_skills: other_skills || "",
      profile_picture: profilePicturePath,
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
  const { userID, user_input } = req.body;

  if (!userID || !user_input) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {

    const data = {
      user_input: user_input,
    };

    const response = await axios.post(`${URL}/chat`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response.data);

    res.status(200).json(response.data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createModule = async (req, res) => {
  const { title } = req.body;
  const duration = "NA"

  if (!title) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const response = await axios.post(`${URL}/youtube`, {
      topic: title,
      max_results: 5
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    res.status(201).json({ message: "Module created successfully", response: response.data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}

module.exports = {
  upload,
  createModule,
  save_worker,
  recommendations,
  chat,
};
