// Import necessary modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Create an instance of the Express application
const app = express();

// Import the routes defined in the route.js file
const Routes = require("./routes/route.js");

// Load environment variables from the .env file
dotenv.config();

// Enable parsing of JSON request bodies with a limit of 10mb
app.use(express.json({ limit: "10mb" }));
// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Connect to MongoDB using the connection string from environment variables
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

// Use the defined routes for the application
app.use("/", Routes);

// Export the Express app so Vercel can handle the requests
module.exports = app;
