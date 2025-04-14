// index.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Routes = require("./routes/route.js");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json({ limit: "10mb" }));

// Configure CORS to allow requests from your frontend's origin
// Option A: Allow all origins
app.use(cors());

// Option B: Restrict to specific domain
app.use(cors({
  origin: 'https://school-management-system-haziel.eta.vercel.app'
}));
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

// Routes
app.use("/", Routes);

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Export your Express app so Vercel can handle the requests
module.exports = app;
