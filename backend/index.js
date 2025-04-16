
// // index.js
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const Routes = require("./routes/route.js");

// // Load environment variables from .env
// dotenv.config();

// const PORT = process.env.PORT || 5000;

// // Create Express app
// const app = express();

// // Middleware for parsing JSON bodies
// app.use(express.json({ limit: "10mb" }));


// // Allow all origins (for development)
// app.use(cors());

// // Configure CORS options (production restricts to your specified domain)
// // const corsOptions = {
// //   origin: "https://school-management-system-haziel.eta.vercel.app",
// //   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// //   allowedHeaders: ["Content-Type", "Authorization", "Accept"],
// //   credentials: true
// // };
// // app.use(cors(corsOptions));

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

// // Define a welcome route for the root path
// app.get("/", (req, res) => {
//   res.send("Welcome to the API!");
// });

// // Mount other routes from your Routes module
// app.use("/", Routes);

// // Export the Express app for Vercel (or other hosting platforms)
// module.exports = app;

// index.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Routes = require("./routes/route.js");

// Load environment variables from .env
dotenv.config();

const PORT = process.env.PORT || 5000;

// Create Express app
const app = express();

// Middleware for parsing JSON bodies
app.use(express.json({ limit: "10mb" }));

// Allow all origins (for development)
app.use(cors());

// Configure CORS options (production restricts to your specified domain)
const corsOptions = {
  origin: "[https://school-management-system-haziel.eta.vercel.app](https://school-management-system-haziel.eta.vercel.app)",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  credentials: true
};

// Add Access-Control-Allow-Origin header to responses for /AdminLogin endpoint
app.use('/AdminLogin', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '[https://school-management-system-haziel.eta.vercel.app](https://school-management-system-haziel.eta.vercel.app)');
  next();
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

// Define a welcome route for the root path
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Mount other routes from your Routes module
app.use("/", Routes);

// Export the Express app for Vercel (or other hosting platforms)
module.exports = app;