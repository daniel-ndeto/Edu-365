const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const Routes = require("./routes/route.js");

dotenv.config();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Configure CORS to allow requests from your frontend domain
app.use(cors({
  origin: "https://edu-365-front.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// Connect to MongoDB using the connection string from environment variables
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

// Use defined routes
app.use("/", routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started at port no. ${PORT}`);
});
