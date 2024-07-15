const Submission = require('../models/Submission');

exports.addSubmission = async (req, res) => {
    const { userId, problemId } = req.body;
    const filePath = req.file.path;

    try {
        const submission = new Submission({ userId, problemId, filePath });
        await submission.save();
        res.status(201).json({ message: 'Submission added successfully', submission });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find().populate('userId problemId');
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
