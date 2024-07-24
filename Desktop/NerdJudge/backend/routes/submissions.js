const express = require('express');
const router = express.Router();
const multer = require('multer');
const Submission = require('../models/Submissions');
const verifyToken = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const { generateFile } = require('./generateFile');
const { executeCpp } = require('./executeCpp');
const { generateInputFile } = require('./generateInputFile');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/submit', verifyToken, upload.single('file'), async (req, res) => {
  try {
    const { problemId, code, input } = req.body;
    const userId = req.user.id;
    let filePath;

    if (req.file) {
      filePath = req.file.path;
      const submission = new Submission({
        userId,
        problemId,
        filePath,
      });
      await submission.save();
    }

    if (code) {
      const codeFilePath = await generateFile('cpp', code);
      const inputFilePath = await generateInputFile(input);
      const output = await executeCpp(codeFilePath, inputFilePath);
      return res.json({ output }); // Return here to ensure no further responses
    }

    return res.status(400).json({ message: 'No code provided' }); // Return here as well

  } catch (error) {
    console.error('Error submitting:', error);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Failed to submit', error: error.message });
    }
  }
});


router.get('/usersubmissions', verifyToken, async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.user.id });
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
