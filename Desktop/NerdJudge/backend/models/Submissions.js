// models/Submissions.js

const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Reference to the User model
  },
  title: {
    type: String,
    required: true,
    ref: 'Problem',
  },
  filePath: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  verdict:{
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model('Submission', SubmissionSchema);
