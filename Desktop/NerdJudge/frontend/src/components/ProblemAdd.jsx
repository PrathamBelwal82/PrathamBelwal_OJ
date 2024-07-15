import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const ProblemAdd = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newProblem = {
            title,
            description,
            difficulty
        };

        try {
            const response = await fetch('http://localhost:8000/problems/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProblem),
            });

            if (response.ok) {
                setTitle('');
                setDescription('');
                setDifficulty('');
                alert('Problem added successfully');
            } else {
                console.error('Failed to create problem');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Add a New Problem
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    required
                    multiline
                    rows={4}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    fullWidth
                    rows={4}
                    sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" color="primary">
                    Create Problem
                </Button>
            </Box>
        </Container>
    );
};

export default ProblemAdd;
