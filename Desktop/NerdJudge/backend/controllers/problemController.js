const Problem = require('../models/Problems');

exports.getProblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.status(200).json(problems);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getProblemById = async (req, res) => {
  try {
    const { id } = req.params;
    const problem = await Problem.findById(id);
    if (!problem) {
      return res.status(404).send("Problem not found");
    }
    res.status(200).json(problem);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.createProblem = async (req, res) => {
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
};
