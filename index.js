const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const axios = require("axios");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { mobileApiUrl } = require("./Constants.JS");
const { pcApiUrl } = require("./Constants.JS");

const app = express();

// Allow requests from anywhere
app.use(cors());

// Proxy route

app.use("/api/v1/mobile", (req, res, next) => {
  

  const proxyMiddleware = createProxyMiddleware({
    target: mobileApiUrl,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader(
        "User-Agent",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 15_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
      );
    },
  });

  proxyMiddleware(req, res, next);
});
app.get("/api/v1/mobile", async (req, res) => {
  try {
    const response = await axios.get(mobileApiUrl);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.use("/api/v1/pc", (req, res, next) => {
 

  const proxyMiddleware = createProxyMiddleware({
    target: pcApiUrl,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader(
        "User-Agent",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 15_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
      );
    },
  });

  proxyMiddleware(req, res, next);
});
app.get("/api/v1/pc", async (req, res) => {

  try {
    const response = await axios.get(pcApiUrl);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/api/v1/restaurantmenu/:id", (req, res, next) => {
  const resId = req.params.id;
  const targetUrl = `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.6542&lng=77.2373&restaurantId=${resId}&isMenuUx4=true&submitAction`;

  const proxyMiddleware = createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader(
        "User-Agent",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 15_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
      );
    },
  });

  proxyMiddleware(req, res, next);
});
app.get("/api/v1/restaurantmenu/:id", async (req, res) => {
  const resId = req.params.id;
  const url = `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.6542&lng=77.2373&restaurantId=${resId}&isMenuUx4=true&submitAction`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/api/v1/collections/:type/:id", (req, res, next) => {
  const collectionId = req.params.id;
  const collectionType = req.params.type;
  const targetUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6542&lng=77.2373&collection=${collectionId}&tags=${collectionType}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`;

  const proxyMiddleware = createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader(
        "User-Agent",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 15_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
      );
    },
  });

  proxyMiddleware(req, res, next);
});
app.get("/api/v1/collections/:type/:id", async (req, res) => {
  const collectionId = req.params.id;
  const collectionType = req.params.type;
  const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6542&lng=77.2373&collection=${collectionId}&tags=${collectionType}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.send("Server Running");
});

// Server Starts
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

