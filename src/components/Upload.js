import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  TextField,
  Grid,
  Alert,
  CircularProgress,
  LinearProgress,
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function Upload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onDrop = (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      // Check file size (1MB limit)
      if (uploadedFile.size > 1024 * 1024) {
        setError('File size must be less than 1MB');
        return;
      }
      
      // Check file type
      const allowedTypes = ['.csv', '.xlsx', '.xls'];
      const fileExtension = uploadedFile.name.toLowerCase().substring(uploadedFile.name.lastIndexOf('.'));
      
      if (!allowedTypes.includes(fileExtension)) {
        setError('Only CSV and Excel files are supported');
        return;
      }
      
      setFile(uploadedFile);
      setError(null);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append('files', file);  // Changed from 'file' to 'files'
      
      if (fromDate) formData.append('from_date', fromDate);
      if (toDate) formData.append('to_date', toDate);

      const response = await axios.post('http://localhost:8000/api/analyze', formData, {  // Updated endpoint
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Store analysis_id in localStorage for dashboard access
      localStorage.setItem('current_analysis_id', response.data.analysis_id);
      
      setSuccess('File processed successfully! Redirecting to dashboard...');
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to process file');
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        📁 Upload Financial Data
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Select File
              </Typography>
              
              <Box
                {...getRootProps()}
                sx={{
                  border: '2px dashed #ccc',
                  borderRadius: 2,
                  p: 4,
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: isDragActive ? '#f0f0f0' : 'transparent',
                  '&:hover': {
                    backgroundColor: '#f9f9f9',
                  },
                }}
              >
                <input {...getInputProps()} />
                <CloudUpload sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  {isDragActive ? 'Drop the file here' : 'Drag & drop a file here, or click to select'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Supports CSV, Excel files (max 1MB)
                </Typography>
              </Box>

              {file && (
                <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography variant="body1">
                    📄 Selected: {file.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Size: {formatFileSize(file.size)}
                  </Typography>
                </Box>
              )}

              {uploading && (
                <Box sx={{ mt: 2 }}>
                  <LinearProgress />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Processing file...
                  </Typography>
                </Box>
              )}

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  {success}
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Filter Options
              </Typography>
              
              <TextField
                fullWidth
                label="From Date (MM-YYYY)"
                placeholder="01-2024"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                sx={{ mb: 2 }}
                helperText="Optional: Start date for filtering"
              />
              
              <TextField
                fullWidth
                label="To Date (MM-YYYY)"
                placeholder="12-2024"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                sx={{ mb: 3 }}
                helperText="Optional: End date for filtering"
              />

              <Button
                fullWidth
                variant="contained"
                onClick={handleUpload}
                disabled={!file || uploading}
                startIcon={uploading ? <CircularProgress size={20} /> : <CloudUpload />}
              >
                {uploading ? 'Processing...' : 'Process File'}
              </Button>

              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="textSecondary">
                  💡 Tips:
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  • Use MM-YYYY format for dates (e.g., 01-2024)
                  • Leave dates empty to process all data
                  • Supported formats: CSV, XLSX, XLS
                  • Maximum file size: 1MB
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Upload;
