// frontend/src/components/FileUpload.jsx

import React, { useState } from 'react';
import { Typography, Button, CircularProgress } from '@mui/material';

function FileUpload({ userId, problemId }) {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async () => {
        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('file', file);
            formData.append('userId', userId); // Include userId in formData
            formData.append('problemId', problemId); // Include problemId in formData

            const response = await fetch('http://localhost:8000/submissions/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('File uploaded successfully!');
            } else {
                alert('Failed to upload file');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload file');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <Typography variant="h6">Upload Submission</Typography>
            <input type="file" onChange={handleFileChange} />
            <Button
                variant="contained"
                color="primary"
                disabled={!file || uploading}
                onClick={handleSubmit}
            >
                {uploading ? <CircularProgress size={24} /> : 'Upload'}
            </Button>
        </div>
    );
}

export default FileUpload;
