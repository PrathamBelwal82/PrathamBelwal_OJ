import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProblemDetail() {
  const [problem, setProblem] = useState({});
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef();
  const { id } = useParams(); // Get the problem ID from the URL

  useEffect(() => {
    const fetchProblemDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/problems/${id}`);
        setProblem(response.data); // Assuming your API returns problem details as JSON
      } catch (error) {
        console.error('Error fetching problem details:', error);
      }
    };

    fetchProblemDetails();
  }, [id]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please upload a file');
      return;
    }

    const formData = new FormData();
    formData.append('problemId', id);
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/submissions/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to submit file');
      console.error('Error submitting file:', error);
    }
  };

  return (
    <div>
      <h2>{problem.title}</h2>
      <p>{problem.description}</p>
      <form onSubmit={handleSubmit}>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ProblemDetail;
