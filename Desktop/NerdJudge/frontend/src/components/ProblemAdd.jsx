import React, { useState,useEffect } from 'react';
import { AppBar,Toolbar,Container, TextField, Button, Typography, Box, IconButton, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';
const ProblemAdd = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [tags, setTags] = useState(['']); // Initialize with one empty tag field
    const [testCases, setTestCases] = useState([{ input: '', output: '' }]);
    const { user } = useAuth();
    const [message, setMessage] = useState('');
    const [str,setStr]=useState('');
    useEffect(() => {
        if (!user) {
            setStr('NoUser');
            setMessage('Please Log In To Add Problems');
        }
    }, [user]);

    const handleAddTag = () => {
        setTags([...tags, '']); // Add an empty tag field
    };

    const handleRemoveTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleTagChange = (index, value) => {
        const updatedTags = tags.map((tag, i) =>
            i === index ? value : tag
        );
        setTags(updatedTags);
    };

    const handleAddTestCase = () => {
        setTestCases([...testCases, { input: '', output: '' }]);
    };

    const handleRemoveTestCase = (index) => {
        setTestCases(testCases.filter((_, i) => i !== index));
    };

    const handleTestCaseChange = (index, field, value) => {
        const updatedTestCases = testCases.map((testCase, i) =>
            i === index ? { ...testCase, [field]: value } : testCase
        );
        setTestCases(updatedTestCases);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const newProblem = {
            title,
            description,
            difficulty,
            tags, // Include tags in the submission
            testCases
        };

        try {
            const response = await fetch('https://backend.nerdjudge.me/problems/add', {
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
                setTags(['']); // Reset tags
                setTestCases([{ input: '', output: '' }]); // Reset test cases
                alert('Problem added successfully');
            } else {
                console.error('Failed to create problem');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        str === 'NoUser'?<Container sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" component="p" gutterBottom>
            {message}
        </Typography>
        <Box sx={{ mb: 2 }}>
            <Button
                color="primary"
                variant="contained"
                component={Link}
                to="/login"
                sx={{ mx: 1 }}
            >
                Login
            </Button>
            <Button
                color="secondary"
                variant="contained"
                component={Link}
                to="/register"
                sx={{ mx: 1 }}
            >
                Register
            </Button>
        </Box>
    </Container>:
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
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <Typography variant="h6" component="h2" gutterBottom>
                    Tags
                </Typography>
                {tags.map((tag, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={10}>
                                <TextField
                                    label={`Tag ${index + 1}`}
                                    value={tag}
                                    onChange={(e) => handleTagChange(index, e.target.value)}
                                    fullWidth
                                    required
                                    sx={{ mb: 1 }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton
                                    color="error"
                                    onClick={() => handleRemoveTag(index)}
                                    sx={{ mt: 2 }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                ))}
                <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAddTag}
                    sx={{ mb: 2 }}
                >
                    Add Tag
                </Button>
                <Typography variant="h6" component="h2" gutterBottom>
                    Test Cases
                </Typography>
                {testCases.map((testCase, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={10}>
                                <TextField
                                    label={`Input ${index + 1}`}
                                    value={testCase.input}
                                    onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                                    fullWidth
                                    required
                                    multiline
                                    rows={2}
                                    sx={{ mb: 1 }}
                                />
                                <TextField
                                    label={`Output ${index + 1}`}
                                    value={testCase.output}
                                    onChange={(e) => handleTestCaseChange(index, 'output', e.target.value)}
                                    fullWidth
                                    required
                                    multiline
                                    rows={2}
                                    sx={{ mb: 1 }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton
                                    color="error"
                                    onClick={() => handleRemoveTestCase(index)}
                                    sx={{ mt: 2 }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                ))}
                <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAddTestCase}
                    sx={{ mb: 2 }}
                >
                    Add Test Case
                </Button>
                <Button type="submit" variant="contained" color="primary">
                    Create Problem
                </Button>
            </Box>
        </Container>
    );
};

export default ProblemAdd;
