const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Routes = require("./routes/route.js");

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Parse JSON bodies
app.use(express.json({ limit: "10mb" }));

// --- CORS Configuration ---
// Only allow your frontend’s Vercel domain
const allowedOrigin = "https://school-management-system-hazel-eta.vercel.app";

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl) or from the specific allowed origin
    if (!origin || origin === allowedOrigin) {
      callback(null, true);
    } else {
      console.warn(`Blocked CORS for origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies/auth headers
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

// 1️⃣ Handle preflight requests for all routes
app.options("*", cors(corsOptions));

// 2️⃣ Apply CORS middleware to all other requests
app.use(cors(corsOptions));
// --- End CORS Configuration ---

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Mount your routes
app.use("/", Routes);

// Error handler (catches CORS and other errors)
app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ message: "Forbidden: Origin not allowed" });
  }
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

module.exports = app;

// If run directly (not on Vercel), start the server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}


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
