import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
      console.log('Email:', email);
  console.log('Password:', password);
      const response = await axios.post('http://localhost:8000/login', {
        email,
        password
      });
  
      const { token, userId } = response.data; // Destructure the response data
      console.log('Email:', token);
      console.log('Password:', userId);
      // Check if token and userId are present in the response
      if (token && userId) {
        login(token, userId);
        navigate('/');
      } 
    } catch (error) {
      console.error('Login error:', error);
      setError('Server error');
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
