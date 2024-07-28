import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Problems.css'; // Import your custom CSS file

function Problems() {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await fetch('http://localhost:8000/problems');
                const data = await response.json();
                setProblems(data);
            } catch (error) {
                console.error('Error fetching problems:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="problems-container">
            <h1 className="problems-title">Problems</h1>
            {problems.length > 0 ? (
                <table className="problems-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {problems.map(problem => (
                            <tr key={problem._id}>
                                <td>
                                    <Link to={`/problems/${problem._id}`} className="problem-link">
                                        {problem.title}
                                    </Link>
                                </td>
                                <td>{problem.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No problems available.</p>
            )}
        </div>
    );
}

export default Problems;
