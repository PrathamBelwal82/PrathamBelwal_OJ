import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { AppBar, Toolbar, Typography, Button, Container, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const { user, logout } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:8000/leaderboard');
        setLeaderboard(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

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
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to the NerdJudge
        </Typography>
        <Typography variant="body1" gutterBottom>
          This is the homepage of your online judge system. You can add more content here.
        </Typography>

        {/* Leaderboard Section */}
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Leaderboard
          </Typography>
          <Paper elevation={3} sx={{ padding: 2, maxHeight: '400px', overflow: 'auto' }}>
            <Typography variant="h6" component="h3">
              Top 10 Users This Month
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
    </div>
  );
};

export default Home;
