const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
require("dotenv").config();

const URL = process.env.DB_URL;

async function connectDB() {
  try {
    await mongoose.connect(URL);
    console.log("mongo connected")
  } catch (err) {
    console.error("connection error ->", err);
  }
}

module.exports = connectDB;
