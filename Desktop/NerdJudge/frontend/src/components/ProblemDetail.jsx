import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, TextField } from '@mui/material';

function ProblemDetail() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      const response = await fetch(`http://localhost:8000/problems/${id}`);
      const data = await response.json();
      setProblem(data);
    };

    fetchProblem();
  }, [id]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('problemId', id);

    await fetch('http://localhost:8000/submissions', {
      method: 'POST',
      body: formData,
    });
  };

  if (!problem) return <p>Loading...</p>;

  return (
    <Container>
      <Typography variant="h4">{problem.title}</Typography>
      <Typography variant="body1">{problem.description}</Typography>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default ProblemDetail;
