const mongoose = require("mongoose")

// Define the schema for the notice model
const noticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    // Add timestamps for when the notice was created and updated
}, { timestamps: true });

module.exports = mongoose.model("notice", noticeSchema)
