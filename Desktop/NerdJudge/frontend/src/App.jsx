import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Import the Layout component
import Home from './components/Home';
import Problems from './components/Problems';
import ProblemDetail from './components/ProblemDetail';
import Submissions from './components/Submissions';
import Login from './components/Login';
import Register from './components/Register';
import ProblemAdd from './components/ProblemAdd';
import UserSubmissions from './components/UserSubmissions';
import SubmissionDetail from './components/SubmissionDetail';
import { useAuth } from './components/AuthContext';
function App() {
  useEffect(() => {
    document.title = 'NerdJudge';
  }, []);
  const { user, logout } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/problems" element={<Problems />} />
         
          <Route path="/problems/:id" element={<ProblemDetail />} />
          if(user){
        <Route path="/problems/add" element={<ProblemAdd />} />}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/submissions/usersubmissions" element={<UserSubmissions />} />
          <Route path="/submission/:id" element={<SubmissionDetail />} />
        </Route>
        if(!user){
        <Route path="/problems/add" element={<ProblemAdd />} />}
      </Routes>
    </Router>
  );
}

export default App;
