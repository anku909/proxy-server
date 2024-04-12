const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const apiData = require("./data/apiData.json");
const axios = require("axios");

const app = express();

// Allow requests from anywhere
app.use(cors());

// Proxy route
app.get("/api/v1/collections", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6542&lng=77.2373&collection=83644&tags=layout_CCS_Pizza&sortBy=&filters=&type=rcv2&offset=0&page_type=null",
      {
        params: req.query,
        headers: {
          "User-Agent": req.get("User-Agent"),
          Referer: req.get("Referer"),
        },
      }
    );
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
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
