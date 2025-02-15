const Course = require("../models/course");
const Module = require("../models/module");

const getCourse = async (req, res) => {
  const { courseID } = req.body;

  if (!courseID) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const course = await Course.findOne(courseID);
    res.status(200).json(course);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

const createCourse = async (req, res) => {
  const { title, description, category, difficulty, duration, modules } = req.body;

  if (!title || !description || !category || !difficulty || !duration || !modules) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const course = new Course({
    title,
    description,
    category,
    difficulty,
    duration,
    modules,
  });

  try {
    await course.save();
    res.status(201).json({ message: "Course created successfully", course });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

const getModule = async (req, res) => {
  const { moduleID } = req.body;

  if (!moduleID) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const module = await Module.findOne(moduleID);
    res.status(200).json(module);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { getCourse, createCourse, getModule };