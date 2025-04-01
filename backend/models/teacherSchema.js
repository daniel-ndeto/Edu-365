const mongoose = require("mongoose")

// Define the schema for the teacher model
const teacherSchema = new mongoose.Schema({
    // Name of the teacher, required field
    name: {
        type: String,
        required: true,
    },
    // Email of the teacher, must be unique, required field
    email: {
        type: String,
        unique: true,
        required: true,
    },
    // Password of the teacher, required field
    password: {
        type: String,
        required: true,
    },
    // Role of the teacher, defaults to "Teacher"
    role: {
        type: String,
        default: "Teacher"
    },
    // Reference to the school the teacher belongs to, required field
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true,
    },
    // Reference to the subject the teacher teaches
    teachSubject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject',
    },
    // Reference to the class the teacher teaches, required field
    teachSclass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass',
        required: true,
    },
    // Array of attendance records for the teacher
    attendance: [{
        // Date of the attendance record, required field
        date: {
            type: Date,
            required: true
        },
        // Number of present students
      
        presentCount: {
            type: String,
        },
        absentCount: {
            type: String,
        }
    }]
    // Add timestamps for when the teacher was created and updated
}, { timestamps: true });

// Create and export the teacher model
module.exports = mongoose.model("teacher", teacherSchema)
