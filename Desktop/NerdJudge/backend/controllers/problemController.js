const Problem = require('../models/Problems');
const verifyAdmin = require('../middleware/roleMiddleware'); // Import the admin verification middleware

exports.getProblems = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'title', sortOrder = 'asc', difficulty, tags } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const query = {};
    if (difficulty) {
      query.difficulty = { $regex: difficulty, $options: 'i' };
    }
    if (tags) {
      query.tags = { $in: tags.split(',') };
    }

    const totalProblems = await Problem.countDocuments(query);

    const problems = await Problem.find(query)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 });

    res.status(200).json({
      problems,
      totalPages: Math.ceil(totalProblems / limitNumber),
      currentPage: pageNumber,
    });
  } catch (error) {
    console.error('Error fetching problems:', error);
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

exports.createProblem = (verifyAdmin, async (req, res) => { // Use middleware to check admin role
  try {
    const { title, description, difficulty, tags, testCases } = req.body;

    if (!title || !description || !difficulty) {
      return res.status(400).json({ message: 'Title, description, and difficulty are required' });
    }

    const newProblem = new Problem({
      title,
      description,
      difficulty,
      tags: tags || [], // Initialize as empty array if not provided
      testCases: testCases || [],
    });

    await newProblem.save();
    res.status(201).json(newProblem);
  } catch (error) {
    console.error('Error adding problem:', error);
    res.status(500).json({ message: 'Failed to add problem', error: error.message });
  }
});
