

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

// --- CORS Configuration ---
// Define the specific origin allowed to access this API
const allowedOrigin = 'https://school-management-system-hazel-eta.vercel.app'; // Correct origin from error description

const corsOptions = {
  // Use a function for origin to handle exact match and potentially allow tools/server-side requests
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl) or from the specific allowed origin
    if (!origin || origin === allowedOrigin) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked for origin: ${origin}`); // Log blocked origins for debugging
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Specify methods your frontend uses
  allowedHeaders: ["Content-Type", "Authorization"], // Specify headers your frontend sends (add others if needed)
  credentials: true, // Allow cookies or authorization headers to be sent
  optionsSuccessStatus: 200 // For compatibility with older browsers/proxies
};

// Apply CORS middleware with the configured options

app.use(cors(corsOptions));

// --- End CORS Configuration ---


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    // useNewUrlParser and useUnifiedTopology are no longer needed in recent Mongoose versions
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

// Define a welcome route for the root path
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Mount other routes from your Routes module
// Ensure this comes *after* the CORS middleware is applied
app.use("/", Routes);

// Optional: Basic error handler (catches errors like the one thrown by CORS function)
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    res.status(403).json({ message: 'Forbidden: This origin is not allowed access.' });
  } else {
    console.error(err.stack); // Log other errors
    res.status(500).send('Something broke!');
  }
});

// Export the Express app for Vercel (or other hosting platforms)
module.exports = app;

// Optional: Start the server locally if not running in a serverless environment like Vercel
// Check if the module is run directly (e.g., `node index.js`)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening locally on port ${PORT}`);
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
