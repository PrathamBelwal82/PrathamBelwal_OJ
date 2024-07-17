// submissionRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Submission = require('../models/Submissions');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/submit', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const submission = new Submission({
      problemId: req.body.problemId,
      filePath: req.file.path,
    });

    await submission.save();
    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit file', error: errzor.message });
  }
});



module.exports = router;
