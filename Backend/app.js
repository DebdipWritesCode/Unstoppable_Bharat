const express = require("express");
const mongoose = require("mongoose"); // Import mongoose
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
