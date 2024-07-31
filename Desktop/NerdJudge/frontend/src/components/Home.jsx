import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { AppBar, Toolbar, Typography, Button, Container, Box, Paper, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  
  const { user, logout } = useAuth();
  // [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const leaderboard = [
    { _id: '1', username: 'belwalPratham', problemsSolved: 15 },
    { _id: '2', username: 'tourist', problemsSolved: 12 },
    { _id: '3', username: 'lawerence', problemsSolved: 10 },
    { _id: '4', username: 'jiangly', problemsSolved: 8 },
    { _id: '5', username: 'rohit', problemsSolved: 7 },
    { _id: '6', username: 'kohli', problemsSolved: 6 },
    { _id: '7', username: 'User7', problemsSolved: 5 },
    { _id: '8', username: 'User8', problemsSolved: 4 },
    { _id: '9', username: 'User9', problemsSolved: 3 },
    { _id: '10', username: 'User10', problemsSolved: 2 },
  ];
  /*useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:8000/leaderboard');
        setLeaderboard(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError('Failed to load leaderboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);*/

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NerdJudge
          </Typography>
          {user ? (
            <div>
              <Button color="inherit" onClick={logout}>Logout</Button>
              <Button color="inherit" component={Link} to="/problems">Problems</Button>
              <Button color="inherit" component={Link} to="/submissions/usersubmissions">Submissions</Button>
              <Button color="inherit" component={Link} to="/problems/add">Add Problems</Button>
            </div>
          ) : (
            <div>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {!user ? (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4, border: '1px solid #ddd', borderRadius: '8px' }}>
            <Typography variant="h5" gutterBottom>
              Welcome to NerdJudge
            </Typography>
            <Typography variant="body1" gutterBottom>
              Please choose an option below:
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/login" sx={{ mb: 2 }}>
              Login
            </Button>
            <Button variant="outlined" color="primary" component={Link} to="/register">
              Register
            </Button>
          </Box>
        </Container>
      ) : (
        <Container>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to the NerdJudge
          </Typography>
          <Typography variant="body1" gutterBottom>
            This is the homepage of your online judge system. A sample leaderboard will implement among other features.
          </Typography>
          {/* Leaderboard Section */}
          <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Leaderboard
          </Typography>
          <Paper elevation={3} sx={{ padding: 2, maxHeight: '400px', overflow: 'auto' }}>
            <Typography variant="h6" component="h3">
              Top 10 Users
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
              {leaderboard.map((user, index) => (
                <Box key={user._id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">{index + 1}. {user.username}</Typography>
                  <Typography variant="body1">{user.problemsSolved} problems solved</Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
        </Container>
      )}
    </div>
  );
};

export default Home;

