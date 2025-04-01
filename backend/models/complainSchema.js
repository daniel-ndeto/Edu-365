const mongoose = require('mongoose');

// Define the schema for the complain model
const complainSchema = new mongoose.Schema({
    // Reference to the student who made the complaint
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        required: true
    },
    // Date when the complaint was made
    date: {
        type: Date,
        required: true
    },
    // Details of the complaint
    complaint: {
        type: String,
        required: true
    },
    // Reference to the school the complaint belongs to
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true,
    }
});

module.exports = mongoose.model("complain", complainSchema);
