import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/themes/prism.css';
import { useAuth } from './AuthContext';

function ProblemDetail() {
  const [problem, setProblem] = useState({});
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [codeContent, setCodeContent] = useState('');
  const [inputContent, setInputContent] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('cpp'); // Default language
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
    formData.append('language', language);

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
      console.log('Submission response:', response.data);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error submitting:', error);
      setMessage('Failed to submit');
    }
  };

  const handleRun = async () => {
    const payload = {
      language,
      code: codeContent,
      input: inputContent,
    };

    try {
      const { data } = await axios.post('http://localhost:8000/execute/run', payload);
      console.log('Code execution response:', data);
      setOutput(data.output);
    } catch (error) {
      console.log('Error executing code:', error.response);
    }
  };

  const getLanguageHighlight = () => {
    switch (language) {
      case 'cpp':
        return languages.c;
      case 'c':
        return languages.c;
      case 'java':
        return languages.java;
      case 'python':
        return languages.python;
      default:
        return languages.js;
    }
  };

  return (
    <div>
      <h2>{problem.title}</h2>
      <p>{problem.description}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Language:
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
          </select>
        </label>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
      <div>
        <h3>Code Editor</h3>
        <Editor
          value={codeContent}
          onValueChange={(code) => setCodeContent(code)}
          highlight={(code) => highlight(code, getLanguageHighlight())}
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
          highlight={(input) => highlight(input, getLanguageHighlight())}
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
