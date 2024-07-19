const express = require('express');
const router = express.Router();
const multer = require('multer');
const Submission = require('../models/Submissions');
const verifyToken = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');

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
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const submission = new Submission({
      userId: req.user.id,  // Use req.user from the verified token
      problemId: req.body.problemId,
      filePath: req.file.path,
    });

    await submission.save();
    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit file', error: error.message });
  }
});

router.get('/usersubmissions', verifyToken, async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.user.id });
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
