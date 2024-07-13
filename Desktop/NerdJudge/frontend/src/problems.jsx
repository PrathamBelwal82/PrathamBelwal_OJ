import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, TextField, Grid, Card, CardContent, CardActions } from '@mui/material';

function Problems() {
    const [problems, setProblems] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');

    useEffect(() => {
        fetchProblems();
    }, []);

    const fetchProblems = async () => {
        try {
            const response = await fetch('http://localhost:8000/problems');
            if (!response.ok) {
                throw new Error('Failed to fetch problems');
            }
            const data = await response.json();
            setProblems(data);
        } catch (error) {
            console.error('Error fetching problems:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newProblem = {
            title,
            description,
            difficulty,
        };

        try {
            const response = await fetch('http://localhost:8000/problems/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProblem),
            });

            if (response.status === 201) {
                fetchProblems();
                setTitle('');
                setDescription('');
                setDifficulty('');
            } else {
                console.error('Failed to add problem');
            }
        } catch (error) {
            console.error('Error adding problem:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Problems</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Description"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained" color="primary">Add Problem</Button>
            </form>
            <Grid container spacing={3} style={{ marginTop: 20 }}>
                {problems.map((problem) => (
                    <Grid item xs={12} md={6} key={problem._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">{problem.title}</Typography>
                                <Typography variant="body2" color="text.secondary"><strong>Difficulty:</strong> {problem.difficulty}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" component={Link} to={`/problems/${problem._id}`}>View Details</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Problems;
