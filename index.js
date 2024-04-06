const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const apiData = require("./data/apiData.json");

const app = express();
// Allow requests from anywhere
app.use(cors());
// Proxy route
app.get("/api/v1", (req, res) => {
  res.json(apiData);
});

app.get("/", (req, res) => {
  res.send("Server Running use /api/v1 to get json data");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
