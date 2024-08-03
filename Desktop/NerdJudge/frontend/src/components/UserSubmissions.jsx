import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Link, Pagination } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const UserSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ totalPages: 1, currentPage: 1 });
  const { user } = useAuth();

  const fetchSubmissions = async (page = 1) => {
    if (!user) {
      console.log('User is not logged in');
      return;
    }

    try {
      const response = await axios.get('https://backend.nerdjudge.me/submissions/usersubmissions', {
        headers: { Authorization: `Bearer ${user.token}` },
        params: { page, limit: 7 },
        withCredentials: true,
      });
      setSubmissions(response.data.submissions);
      setPagination({
        totalPages: response.data.pagination.totalPages,
        currentPage: response.data.pagination.currentPage,
      });
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions(pagination.currentPage);
  }, [user, pagination.currentPage]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Submissions
      </Typography>
      {submissions.length > 0 ? (
        <>
          <TableContainer component={Paper} sx={{ borderRadius: '8px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Submission ID</TableCell>
                  <TableCell>Submission Time</TableCell>
                  <TableCell>Verdict</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission._id}>
                    <TableCell>
                      <Link component={RouterLink} to={`/submission/${submission._id}`}>
                        {submission._id}
                      </Link>
                    </TableCell>
                    <TableCell>{new Date(submission.submittedAt).toLocaleString()}</TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          color: submission.verdict ? 'green' : 'red',
                          fontWeight: 'bold',
                        }}
                      >
                        {submission.verdict ? 'Accepted' : 'Rejected'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={pagination.totalPages}
            page={pagination.currentPage}
            onChange={(event, value) => {
              setLoading(true);
              fetchSubmissions(value);
            }}
            sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
          />
        </>
      ) : (
        <Typography>No submissions available.</Typography>
      )}
    </Container>
  );
};

export default UserSubmissions;
