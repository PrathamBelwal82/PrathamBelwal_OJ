const express = require('express');
const router = express.Router();
const Problem = require('../models/Problems');

// Route to add a new problem
router.post('/add', async (req, res) => {
    try {
        const { title, description, difficulty } = req.body;
        if (!title || !description || !difficulty) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const newProblem = new Problem({ title, description, difficulty });
        await newProblem.save();
        res.status(201).json({ message: 'Problem added successfully' });
    } catch (error) {
        console.error('Error adding problem:', error); // Log the error
        res.status(500).json({ error: 'Failed to add problem' });
    }
});

// Route to fetch all problems
router.get('/', async (req, res) => {
    try {
        const problems = await Problem.find();
        res.status(200).json(problems);
    } catch (error) {
        console.error('Error fetching problems:', error); // Log the error
        res.status(500).json({ error: 'Failed to fetch problems' });
    }
});

// Route to fetch problem by ID
router.get('/:id', async (req, res) => {
    try {
        const newProblem = await Problem.findById(req.params.id);
        if (!newProblem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        res.json(newProblem);
    } catch (error) {
        console.error('Error fetching problem:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
