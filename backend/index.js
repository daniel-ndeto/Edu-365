// Import necessary modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Create an instance of the Express application
const app = express();

// Import the routes defined in the route.js file
const Routes = require("./routes/route.js");

// Define the port number for the server to listen on
const PORT = process.env.PORT || 5000;

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
  // Log a success message if the connection is successful
  .then(console.log("Connected to MongoDB"))
  // Log an error message if the connection fails
  .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));


// Use the defined routes for the application
app.use("/", Routes);

module.exports = (req, res) => {
  res.send("Hello from your serverless function!");
};

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server started at port no. ${PORT}`);
});
