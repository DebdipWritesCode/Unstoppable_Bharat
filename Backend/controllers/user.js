const User = require("../models/user");
const Worker = require("../models/worker");
const Provider = require("../models/provider");

const getUser = async (req, res) => {
  const { userID } = req.body;

  if (!userID) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne(userID);
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getWorker = async (req, res) => {
  const { workerID } = req.body;

  if (!workerID) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const worker = await Worker.findOne(workerID);
    res.status(200).json(worker);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProvider = async (req, res) => {
  const { providerID } = req.body;

  if (!providerID) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const provider = await Provider.findOne(providerID);
    res.status(200).json(provider);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const leaderboard = async (req, res) => {
  try {
    const top_users = await User.find({ role: "worker" })
      .sort({ streak: -1 })
      .limit(15);

    res.status(200).json(top_users);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getUser,
  getWorker,
  getProvider,
  leaderboard,
};
