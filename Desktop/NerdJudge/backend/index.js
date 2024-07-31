const express = require('express');
const path = require('path');
const { DBConnection } = require('./database/db');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend
  credentials: true // Allow cookies and authentication headers
}));

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

// Database Connection
DBConnection();
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1); // Exit with failure
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1); // Exit with failure
});

// Routes
const authRoutes = require('./routes/auth.js');
const problemRoutes = require('./routes/problems.js');
const submissionRoutes = require('./routes/submissions.js');
const userRoutes = require('./routes/users.js');
const executeCodeRouter = require('./routes/executeCode');
const leaderboardRoutes = require('./routes/leaderboard');
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Use routes
app.use('/', authRoutes);
app.use('/problems', problemRoutes);
app.use('/submissions', submissionRoutes);
app.use('/users', userRoutes);
app.use('/execute', executeCodeRouter);
app.use('/leaderboard',leaderboardRoutes)

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
