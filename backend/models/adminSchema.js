const mongoose = require("mongoose")

// Define the schema for the admin model
const adminSchema = new mongoose.Schema({
    // Name of the admin
    name: {
        type: String,
        required: true,
    },
    // Email of the admin, must be unique
    email: {
        type: String,
        unique: true,
        required: true,
    },
    // Password of the admin
    password: {
        type: String,
        required: true,
    },
    // Role of the admin, defaults to "Admin"
    role: {
        type: String,
        default: "Admin"
    },
    // Name of the school the admin is associated with, must be unique
    schoolName: {
        type: String,
        unique: true,
        required: true
    }
});

// Create and export the admin model
/**
 * @typedef Admin
 * @property {string} name - The name of the admin.
 * @property {string} email - The email of the admin.
 */
module.exports = mongoose.model("admin", adminSchema)
