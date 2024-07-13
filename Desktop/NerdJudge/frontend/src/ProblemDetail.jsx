import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Card, CardContent } from '@mui/material';

function ProblemDetail() {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await fetch(`http://localhost:8000/problems/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch problem');
                }
                const data = await response.json();
                setProblem(data);
            } catch (error) {
                console.error('Error fetching problem:', error);
            }
        };

        fetchProblem();
    }, [id]);

    if (!problem) {
        return <CircularProgress />;
    }

    return (
        <Container>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>{problem.title}</Typography>
                    <Typography variant="body1" paragraph>{problem.description}</Typography>
                    <Typography variant="body2" color="text.secondary"><strong>Difficulty:</strong> {problem.difficulty}</Typography>
                </CardContent>
            </Card>
        </Container>
    );
}

export default ProblemDetail;
