const mongoose = require("mongoose");

// Define the schema for the subject model
const subjectSchema = new mongoose.Schema({
    // Name of the subject, required field
    subName: {
        type: String,
        required: true,
    },
    // Code of the subject, required field
    subCode: {
        type: String,
        required: true,
    },
    // Number of sessions for the subject, required field
    sessions: {
        type: String,
        required: true,
    },
    // Reference to the class the subject belongs to, required field
    sclassName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass',
        required: true,
    },
    // Reference to the school the subject belongs to
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    
     // Reference to the teacher who teaches the subject
    
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher',
    }
}, { timestamps: true });

module.exports = mongoose.model("subject", subjectSchema);
