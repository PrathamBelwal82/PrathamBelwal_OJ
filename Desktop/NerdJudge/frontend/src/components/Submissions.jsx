import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Submissions() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchSubmissions();
  }, []);
   const fetchSubmissions = async () => {
    try {
      const response = await axios.get('http://localhost:8000/submissions');
      setSubmissions(response.data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };


  return (
        <div>
          <h2>Submissions</h2>
          <ul>
            {submissions.map((submission) => (
              <li key={submission._id}>
                <span>Problem ID: {submission.problemId}</span>
                <span>File: <a href={submission.filePath} target="_blank" rel="noopener noreferrer">Download</a></span>
              </li>
            ))}
          </ul>
        </div>
  );
}

export default Submissions;
