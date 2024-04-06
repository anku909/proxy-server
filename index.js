const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const axios = require("axios");

const app = express();
// Allow requests from anywhere
app.use(cors());
// Proxy route
app.get("/api/v1", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6542&lng=77.2373&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
      {
        params: req.query, // Forward query parameters to Swiggy API
        headers: {
          "User-Agent": req.get("User-Agent"), // Forward user agent header
          Referer: req.get("Referer"), // Forward referer header
        },
      }
    );
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from Swiggy API:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
