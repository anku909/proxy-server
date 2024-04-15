const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const axios = require("axios");
const { createProxyMiddleware } = require("http-proxy-middleware");
const apiData = require("./data/apiData.json");

const app = express();

// Allow requests from anywhere
app.use(cors());

// Proxy route
app.get("/api/v1", (req, res) => {
  res.status(200).json(apiData);
});
app.use("/api/v1/restaurantmenu/:id", (req, res, next) => {
  const resId = req.params.id;
  const targetUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.6542&lng=77.2373&restaurantId=${resId}&catalog_qa=undefined&isMenuUx4=true&submitAction=ENTER`;

  createProxyMiddleware({ target: targetUrl, changeOrigin: true })(
    req,
    res,
    next
  );
});
app.get("/api/v1/restaurantmenu/:id", async (req, res) => {
  const resId = req.params.id;
  console.log(resId);
  const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.6542&lng=77.2373&restaurantId=${resId}&catalog_qa=undefined&isMenuUx4=true&submitAction=ENTER`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/", (req, res) => {
  res.send("Server Running use /api/v1 to get json data");
});

// Server Starts
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
