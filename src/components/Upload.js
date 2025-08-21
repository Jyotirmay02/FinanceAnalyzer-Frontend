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
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  FormControlLabel,
  Switch,
  Paper
} from '@mui/material';
import { CloudUpload, Delete, Description } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function Upload() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [multiFileMode, setMultiFileMode] = useState(false);
  const [portfolioMode, setPortfolioMode] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onDrop = (acceptedFiles) => {
    const allowedTypes = ['.csv', '.xls', '.xlsx'];
    
    for (const file of acceptedFiles) {
      const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
      
      if (!allowedTypes.includes(fileExtension)) {
        setError('Only CSV and Excel files are supported');
        return;
      }
    }

    if (multiFileMode) {
      // Add to existing files
      setFiles(prev => [...prev, ...acceptedFiles]);
    } else {
      // Single file mode - replace
      setFiles(acceptedFiles.slice(0, 1));
    }
    setError(null);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    multiple: multiFileMode,
  });
  const handleUpload = async () => {
    if (files.length === 0) {
      setError('Please select at least one file');
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      
      // Add all files
      files.forEach(file => {
        formData.append('files', file);
      });
      
      if (fromDate) formData.append('from_date', fromDate);
      if (toDate) formData.append('to_date', toDate);
      if (portfolioMode) formData.append('portfolio_mode', 'true');

      const response = await axios.post('http://localhost:8000/api/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Store analysis_id in localStorage for dashboard access
      localStorage.setItem('current_analysis_id', response.data.analysis_id);
      
      const fileCount = files.length;
      const fileNames = files.map(f => f.name).join(', ');
      
      setSuccess(`${fileCount} file${fileCount > 1 ? 's' : ''} processed successfully! (${fileNames}) Redirecting to dashboard...`);
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to process files');
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Select Files
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={multiFileMode}
                      onChange={(e) => {
                        setMultiFileMode(e.target.checked);
                        if (!e.target.checked) {
                          // Keep only first file when switching to single mode
                          setFiles(prev => prev.slice(0, 1));
                        }
                      }}
                    />
                  }
                  label="Multi-file Analysis"
                />
                
                {multiFileMode && (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={portfolioMode}
                        onChange={(e) => setPortfolioMode(e.target.checked)}
                        color="secondary"
                      />
                    }
                    label="Portfolio Mode (Ignore Self-Transfers)"
                  />
                )}
              </Box>
              
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
                  {isDragActive 
                    ? 'Drop the files here' 
                    : multiFileMode 
                      ? 'Drag & drop files here, or click to select multiple files'
                      : 'Drag & drop a file here, or click to select'
                  }
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Supports CSV, Excel files • {multiFileMode ? 'Multiple files allowed' : 'Single file only'}
                </Typography>
              </Box>

              {files.length > 0 && (
                <Paper sx={{ mt: 2, p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Selected Files ({files.length})
                  </Typography>
                  <List dense>
                    {files.map((file, index) => (
                      <ListItem key={index}>
                        <Description sx={{ mr: 1, color: 'primary.main' }} />
                        <ListItemText
                          primary={file.name}
                          secondary={`${formatFileSize(file.size)} • ${file.type || 'Unknown type'}`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton 
                            edge="end" 
                            onClick={() => removeFile(index)}
                            size="small"
                          >
                            <Delete />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                  
                  {multiFileMode && (
                    <Box sx={{ mt: 1 }}>
                      <Chip 
                        label={`${files.length} file${files.length > 1 ? 's' : ''} selected`}
                        color="primary"
                        size="small"
                      />
                    </Box>
                  )}
                </Paper>
              )}

              {uploading && (
                <Box sx={{ mt: 2 }}>
                  <LinearProgress />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Processing {files.length} file{files.length > 1 ? 's' : ''}...
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

              <Button
                variant="contained"
                onClick={handleUpload}
                disabled={files.length === 0 || uploading}
                startIcon={uploading ? <CircularProgress size={20} /> : <CloudUpload />}
                sx={{ mt: 2 }}
                fullWidth
              >
                {uploading 
                  ? `Processing ${files.length} file${files.length > 1 ? 's' : ''}...`
                  : `Analyze ${files.length} file${files.length > 1 ? 's' : ''}`
                }
              </Button>
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

              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="textSecondary">
                  💡 Tips:
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  • {multiFileMode ? 'Upload multiple bank statements for combined analysis' : 'Upload single bank statement for analysis'}
                  • Use MM-YYYY format for dates (e.g., 01-2024)
                  • Leave dates empty to process all data
                  • Supported formats: CSV, XLSX, XLS
                  • {multiFileMode ? 'Multiple files will be merged automatically' : 'Switch to multi-file mode for portfolio analysis'}
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
