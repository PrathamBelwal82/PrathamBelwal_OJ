const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
dotenv.config();

// Route to add a new problem
router.post('/add', async (req, res) => {
    try {
        const { title, description, difficulty } = req.body;
        const newProblem = new Problem({ title, description, difficulty });
        await newProblem.save();
        res.status(201).json({ message: 'Problem added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add problem' });
    }
});

// Route to fetch all problems
router.get('/', async (req, res) => {
    try {
        const problems = await Problem.find();
        res.status(200).json(problems);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch problems' });
    }
});

module.exports = router;
