import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { useAuth } from './AuthContext';

function ProblemDetail() {
  const [problem, setProblem] = useState({});
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [codeContent, setCodeContent] = useState('');
  const [inputContent, setInputContent] = useState('');
  const [output, setOutput] = useState('');
  const fileInputRef = useRef();
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProblemDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/problems/${id}`);
        setProblem(response.data);
      } catch (error) {
        console.error('Error fetching problem details:', error);
      }
    };

    fetchProblemDetails();
  }, [id]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      setCodeContent(e.target.result);
    };
    reader.readAsText(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userId', user.id);
    formData.append('problemId', id);
    formData.append('code', codeContent);
    formData.append('input', inputContent);

    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await axios.post('http://localhost:8000/submissions/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`
        },
        withCredentials: true,
      });
      console.log('Submission response:', response.data); // Debugging tip
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error submitting:', error); // Debugging tip
      setMessage('Failed to submit');
    }
  };

  const handleRun = async () => {
    const payload = {
      language: 'cpp',
      code: codeContent,
      input: inputContent,
    };

    try {
      const { data } = await axios.post(import.meta.env.VITE_BACKEND_URL, payload);
      console.log('Code execution response:', data); // Debugging tip
      setOutput(data.output);
    } catch (error) {
      console.log('Error executing code:', error.response); // Debugging tip
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
      <div>
        <h3>Code Editor</h3>
        <Editor
          value={codeContent}
          onValueChange={(code) => setCodeContent(code)}
          highlight={(code) => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            border: '1px solid #ddd',
            marginTop: '10px',
          }}
        />
      </div>
      <div>
        <h3>Input</h3>
        <Editor
          value={inputContent}
          onValueChange={(input) => setInputContent(input)}
          highlight={(input) => highlight(input, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            border: '1px solid #ddd',
            marginTop: '10px',
          }}
        />
      </div>
      <button onClick={handleRun}>Run Code</button>
      {output && <pre>{output}</pre>}
    </div>
  );
}

export default ProblemDetail;
