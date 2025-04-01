const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Routes = require("./routes/route.js");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Configure CORS with proper headers
const corsOptions = {
  origin: "https://edu-365-front.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Handle Preflight Requests
app.options("*", cors(corsOptions)); 

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL, {
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
//app.use("/", Routes);

const Routes = require("./routes/route.js");
app.use("/api", Routes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server started at port no. ${PORT}`);
});
