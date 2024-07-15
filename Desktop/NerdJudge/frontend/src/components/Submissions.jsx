import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useParams } from 'react-router-dom';

function Submissions() {
  const { id } = useParams();
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const response = await fetch(`http://localhost:8000/problems/submissions`);
      const data = await response.json();
      setSubmissions(data);
    };

    fetchSubmissions();
  }, [id]);

  return (
    <Container>
      <Typography variant="h4">Submissions</Typography>
      <List>
        {submissions.map((submission) => (
          <ListItem key={submission._id}>
            <ListItemText primary={submission.fileName} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Submissions;
