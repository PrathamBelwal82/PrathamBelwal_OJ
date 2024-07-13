// backend/routes/submissions.js

const express = require('express');
const router = express.Router();
const multer = require('multer'); // For handling file uploads
const path = require('path');
const Submission = require('../models/Submissions');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Directory where files will be stored
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate unique filename
    }
});

// Multer upload instance
const upload = multer({ storage });

// POST route to handle file uploads
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { userId, problemId } = req.body;
        const { filename, path: filePath } = req.file;

        const newSubmission = new Submission({
            userId,
            problemId,
            fileName: filename,
            filePath
        });

        await newSubmission.save();

        res.status(201).json({ message: 'File uploaded successfully', submission: newSubmission });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Failed to upload file' });
    }
});

module.exports = router;
