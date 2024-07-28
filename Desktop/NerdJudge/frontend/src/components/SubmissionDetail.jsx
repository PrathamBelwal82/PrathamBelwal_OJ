import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

function SubmissionDetail() {
  const { submissionId } = useParams(); // Extract submissionId from URL params
  const [submission, setSubmission] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/submissions/${submissionId}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
        setSubmission(response.data);
      } catch (err) {
        setError('Failed to fetch submission details');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [submissionId, user.token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!submission) return <p>No submission data available</p>;

  return (
    <div>
      <h2>Submission Details</h2>
      <p><strong>User ID:</strong> {submission.userId}</p>
      <p><strong>Problem ID:</strong> {submission.problemId}</p>
      <p><strong>File Path:</strong> {submission.filePath}</p>
      <p><strong>Submitted At:</strong> {new Date(submission.submittedAt).toLocaleString()}</p>
    </div>
  );
}

export default SubmissionDetail;
