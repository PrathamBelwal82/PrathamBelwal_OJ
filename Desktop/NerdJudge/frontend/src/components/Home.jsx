import React from 'react';
import { useAuth } from './AuthContext';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Online Judge System
          </Typography>
          {user ? (
            <div>
              <Button color="inherit" onClick={logout}>
              Logout
            </Button>
            <Button color="inherit" component={Link} to="/problems">
                Problems
              </Button>
              <Button color="inherit" component={Link} to="/usersubmissions">
                Submissions
              </Button>
              <Button color="inherit" component={Link} to="/problems/add">
                Add Problems
              </Button>
            </div>
          ) : (
            <div>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to the Online Judge System
        </Typography>
        <Typography variant="body1">
          This is the homepage of your online judge system. You can add more content here.
        </Typography>
      </Container>
    </div>
  );
};

export default Home;
