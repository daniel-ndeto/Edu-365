const mongoose = require("mongoose");

// Define the schema for the sclass model
const sclassSchema = new mongoose.Schema({
    // Name of the class, must be unique
    sclassName: {
        type: String,
        required: true,
    },
    // Reference to the school the class belongs to
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    },
    // Add timestamps for when the class was created and updated
}, { timestamps: true });

module.exports = mongoose.model("sclass", sclassSchema);
