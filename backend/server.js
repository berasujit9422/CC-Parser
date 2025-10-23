require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const parseRoute = require("./routes/parse");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/parse", parseRoute);

app.listen(4000, () => console.log(`✅ Server running on port 4000`));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

connectDB();
