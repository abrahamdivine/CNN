require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const mongo_URI = process.env.MONGO_URI;
const authRoutes = require("./routes/authRoutes");
const newsRoutes = require("./routes/newsRoutes")
const app = express();
const port = 3000;

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection failed:", error.message);
  }
}

connectDB();

app.get("/", (req, res) => {
  res.send("CNN API is running!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
