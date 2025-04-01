const mongoose = require('mongoose');

// Define the schema for the student model
const studentSchema = new mongoose.Schema({
    // Name of the student, required field
    name: {
        type: String,
        required: true
    },
    // Roll number of the student, required field
    rollNum: {
        type: Number,
        required: true
    },
    // Password of the student, required field
    password: {
        type: String,
        required: true
    },
    // Reference to the class the student belongs to, required field
    sclassName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass',
        required: true,
    },
    // Reference to the school the student belongs to, required field
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true,
    },
    // Role of the student, defaults to "Student"
    role: {
        type: String,
        default: "Student"
    },
    // Array of exam results for the student
    examResult: [
        {
            // Reference to the subject for which the result is recorded
            subName: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'subject',
            },
            // Marks obtained by the student in the subject, defaults to 0
            marksObtained: {
                type: Number,
                default: 0
            }
        }
    ],
    // Array of attendance records for the student
    attendance: [{
        // Date of the attendance record, required field
        date: {
            type: Date,
            required: true
        },
        // Status of the student's attendance (Present or Absent), required field
        status: {
            type: String,
            enum: ['Present', 'Absent'],
            required: true
        },
        subName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subject',
            required: true
            // Reference to the subject for which attendance is recorded, required field
        }
    }]
});

module.exports = mongoose.model("student", studentSchema);
