import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Box, Typography } from '@mui/material'; // Assuming you are using Material-UI for UI components
import { useAuth } from '../components/AuthContext';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://backend.nerdjudge.me/login', {
        email,
        password
      }, { withCredentials: true });

      const { token, userId, message, register } = response.data || {};

      if (token && userId) {
        // Handle successful login
        login(token, userId);
        navigate('/');
      } else if (message) {
        // Handle different types of messages from backend
        if (register) {
          // Redirect to registration page if the backend suggests registration
          navigate('/register');
        } else {
          // Display error message from backend
          setError(message);
        }
      } else {
        // Handle unexpected responses
        setError('Unexpected response from server');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Log the response data and set error message
        console.error('Login error:', error.response.data);
        setError(error.response.data.message || 'Server error');
        if(error.response.data.register){
          alert('User does not exist moving to Register page');
        navigate('/register');}
      } else {
        // Log the error message
        console.error('Login error:', error.message);
        setError('Server error');
      }
    }
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Box sx={{ width: '100%', maxWidth: '400px', padding: 4, border: '1px solid #ddd', borderRadius: '8px' }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        </form>
      </Box>
    </Container>
  );
};

export default Login;
