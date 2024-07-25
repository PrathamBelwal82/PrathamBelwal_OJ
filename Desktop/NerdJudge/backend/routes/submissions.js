const express = require('express');
const router = express.Router();
const multer = require('multer');
const Submission = require('../models/Submissions');
const Problem = require('../models/Problems');
const verifyToken = require('../middleware/authMiddleware');
const path = require('path');
const { generateFile } = require('./generateFile');
const { executeCpp } = require('./executeCpp');
const { generateInputFile } = require('./generateInputFile');

// Set up multer for file uploads
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
      const { problemId, code, input, language } = req.body;
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
          const problem = await Problem.findById(problemId);
          if (!problem) {
              return res.status(404).json({ message: 'Problem not found' });
          }

          const testCases = problem.testCases || [];

          // Generate file and input file paths
          const codeFilePath = await generateFile(language, code);
         

          // Execute code and get the output
         

        
          
          // Check if the output matches all test cases
          const verdict = await Promise.all(testCases.map(async ({ input: testInput, output: expectedOutput }) => {
              const testInputFilePath = await generateInputFile(testInput);
              const testOutput = await executeCpp(language, codeFilePath, testInputFilePath);
              console.log(`Test input file path: ${testInputFilePath}`);
              console.log(`Test output: ${testOutput}`);
              console.log(`Expected output: ${expectedOutput}`);
              return testOutput.trim() === expectedOutput.trim();
          }));

          const allPassed = verdict.every(v => v);

          return res.json({
              verdict: allPassed ? 'All test cases passed' : 'Some test cases failed',
              message: 'Submission successful',
          });
      }

      return res.status(400).json({ message: 'No code provided' });

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
