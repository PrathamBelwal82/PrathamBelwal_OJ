// src/components/UserSubmissions.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { List, ListItem, ListItemText, Container, Typography } from '@mui/material';

const UserSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!user) {
        console.log('User is not logged in');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/submissions/usersubmissions', {
          headers: { Authorization: `Bearer ${user.token}` },
          withCredentials: true,
        });
        
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, [user]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>User Submissions</Typography>
      <List>
        {submissions.map((submission) => (
          <ListItem key={submission._id}>
            <ListItemText primary={submission.filePath} secondary={submission.submittedAt} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default UserSubmissions;
