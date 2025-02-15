const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/course");
const jobRoutes = require("./routes/job");
const llmRoutes = require("./routes/llm");
const userRoutes = require("./routes/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/course", courseRoutes);
app.use("/job", jobRoutes);
app.use("/llm", llmRoutes);
app.use("/user", userRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
