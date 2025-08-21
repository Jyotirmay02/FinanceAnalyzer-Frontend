import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C'];

function Categories() {
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const fetchCategoryData = async () => {
    try {
      setLoading(true);
      
      // Get analysis_id from localStorage
      const analysisId = localStorage.getItem('current_analysis_id');
      if (!analysisId) {
        setError('No analysis found. Please upload a file first.');
        setLoading(false);
        return;
      }

      const response = await axios.get(`http://localhost:8000/api/summary/categories/${analysisId}`);
      setCategoryData(response.data.category_summary);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load category data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!categoryData || !categoryData.category_summary.length) {
    return (
      <Alert severity="info" sx={{ mb: 2 }}>
        No category data available. Please upload a file to get started.
      </Alert>
    );
  }

  // Prepare chart data
  const chartData = categoryData.category_summary.map((cat, index) => ({
    name: cat.Category,
    debit: cat['Total Debit'] || 0,
    credit: cat['Total Credit'] || 0,
    color: COLORS[index % COLORS.length],
  }));

  // Filter out categories with 0 debits for pie chart
  const pieData = chartData.filter(item => item.debit > 0);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        📈 Category Analysis
      </Typography>

      <Grid container spacing={3}>
        {/* Bar Chart */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📊 Category Breakdown (Debits vs Credits)
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    fontSize={12}
                  />
                  <YAxis formatter={(value) => `₹${(value/1000).toFixed(0)}K`} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Bar dataKey="debit" fill="#FF8042" name="Debits" />
                  <Bar dataKey="credit" fill="#00C49F" name="Credits" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🥧 Spending Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => 
                      percent > 5 ? `${name.substring(0, 8)}... ${(percent * 100).toFixed(0)}%` : ''
                    }
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="debit"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Data Table */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📋 Category Summary Table
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Category</strong></TableCell>
                      <TableCell align="right"><strong>Total Debits</strong></TableCell>
                      <TableCell align="right"><strong>Debit Count</strong></TableCell>
                      <TableCell align="right"><strong>Total Credits</strong></TableCell>
                      <TableCell align="right"><strong>Credit Count</strong></TableCell>
                      <TableCell align="right"><strong>Net Amount</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {categoryData.category_summary.map((category, index) => {
                      const netAmount = (category['Total Credit'] || 0) - (category['Total Debit'] || 0);
                      return (
                        <TableRow key={index}>
                          <TableCell>{category.Category}</TableCell>
                          <TableCell align="right">
                            {formatCurrency(category['Total Debit'] || 0)}
                          </TableCell>
                          <TableCell align="right">{category['Debit Count'] || 0}</TableCell>
                          <TableCell align="right">
                            {formatCurrency(category['Total Credit'] || 0)}
                          </TableCell>
                          <TableCell align="right">{category['Credit Count'] || 0}</TableCell>
                          <TableCell 
                            align="right" 
                            sx={{ 
                              color: netAmount >= 0 ? 'success.main' : 'error.main',
                              fontWeight: 'bold'
                            }}
                          >
                            {formatCurrency(netAmount)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Categories;
