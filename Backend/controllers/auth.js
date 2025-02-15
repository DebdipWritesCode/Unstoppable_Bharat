const User = require("../models/user");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { first_name, last_name, phone, password, role, gender } = req.body;

  if (!phone || !password || !role || !first_name || !last_name || !gender) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (role !== "provider" && role !== "worker") {
    return res
      .status(400)
      .json({ message: "Role must be either provider or worker" });
  }

  const existingUser = await User.findOne({ phone });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);

  const user = new User({
    phone,
    password: hashedPassword,
    role,
    first_name,
    last_name,
    gender,
  });

  try {
    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "User logged in successfully", user });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { register, login };
