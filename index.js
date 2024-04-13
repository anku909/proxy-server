const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const apiData = require("./data/apiData.json");
const axios = require("axios");

const app = express();

// Allow requests from anywhere
app.use(cors());

// Proxy route
app.get("/api/v1", (req, res) => {
  res.status(200).json(apiData);
});

app.get("/", (req, res) => {
  res.send("Server Running use /api/v1 to get json data");
});

// Server Starts
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
