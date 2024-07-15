// src/components/Problems.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Problems() {
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/problems')
            .then(response => response.json())
            .then(data => setProblems(data));
    }, []);

    return (
        <div>
            <h1>Problems</h1>
            <ul>
                {problems.map(problem => (
                    <li key={problem._id}>
                        <Link to={`/problems/${problem._id}`}>{problem.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Problems;
