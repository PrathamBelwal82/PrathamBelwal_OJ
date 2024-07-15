const express = require('express');

const path = require('path');
const {DBConnection}=require('./database/db')
const cors = require('cors');
const dotenv = require('dotenv');
const Submission = require('./models/Submissions');
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
const submissionRoutes = require('./routes/submissions');

//const submissionRoutes = require('./routes/submissions');

// Start Server
const PORT = process.env.PORT || 8000;

app.use('/', authRoutes);
app.use('/problems', problemRoutes);
app.use('/submissions', submissionRoutes);
//app.use('/problems', submissionRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
