import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from './AuthContext';

const Layout = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NerdJudge
          </Typography>
          {user ? (
            <div>
              <Button color="inherit" to="/" onClick={logout}>Logout</Button>
              <Button color="inherit" component={Link} to="/">Home</Button>
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
      <main style={{ padding: '20px' }}>
        <Outlet /> {/* This is where the routed content will be rendered */}
      </main>
    </>
  );
};

export default Layout;
