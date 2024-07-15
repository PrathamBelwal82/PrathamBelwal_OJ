import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material'; // Assuming you are using Material-UI for UI components
import { useAuth } from '../components/AuthContext';
function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful, redirect to home or dashboard
        login(data);
        navigate('/');
      } else if (data.register) {
        // User does not exist, redirect to register page
        navigate('/register');
      } else {
        // Invalid credentials or other error
        setError(data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Server error');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
