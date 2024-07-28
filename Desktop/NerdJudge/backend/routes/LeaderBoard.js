// routes/leaderboard.js

const express = require('express');
const router = express.Router();
const User = require('../models/Users'); // Adjust the path as needed

// Define the route to get leaderboard data
router.get('/', async (req, res) => {
  try {
    // Define the start of the current month
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    
    // Fetch the top 10 users with the most problems solved in the current month
    const users = await User.aggregate([
      {
        $match: {
          'problemsSolvedDate': { $gte: startOfMonth }
        }
      },
      {
        $group: {
          _id: '$userId', // Group by user ID
          name: { $first: '$name' }, // Include user's name
          problemsSolved: { $sum: 1 } // Count problems solved
        }
      },
      {
        $sort: { 'problemsSolved': -1 } // Sort by the number of problems solved, descending
      },
      {
        $limit: 10 // Limit to top 10 users
      }
    ]);

    res.json(users);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Error fetching leaderboard data' });
  }
});

module.exports = router;
