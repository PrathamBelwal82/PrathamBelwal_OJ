const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { DBConnection } = require('./database/db');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
DBConnection();

// Routes
const authRoutes = require('./routes/auth');
const problemRoutes = require('./routes/problems');
//const submissionRoutes = require('./routes/submissions');

app.use('/', authRoutes);
app.use('/problems', problemRoutes);
//app.use('/problems', submissionRoutes);

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
