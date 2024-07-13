// backend/models/Submission.js

const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming you have a User model
    problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true }, // Assuming you have a Problem model
    fileName: { type: String, required: true },
    filePath: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now }
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
