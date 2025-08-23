import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AccountBalance,
  Receipt,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Get analysis_id from localStorage
      const analysisId = localStorage.getItem('current_analysis_id');
      console.log('Dashboard: analysisId from localStorage:', analysisId);
      
      if (!analysisId) {
        setError('No analysis found. Please upload a file first.');
        setLoading(false);
        return;
      }

      // Fetch overall summary (contains top_categories)
      const summaryResponse = await axios.get(`http://localhost:8000/api/summary/overall/${analysisId}`);
      
      // Use the complete response from overall summary
      setDashboardData(summaryResponse.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load dashboard data');
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

  if (!dashboardData || !dashboardData.top_categories) {
    return (
      <Alert severity="info" sx={{ mb: 2 }}>
        No data available. Please upload a file to get started.
      </Alert>
    );
  }

  const { overall_summary, filter_info, top_categories } = dashboardData;

  // Add safety checks for overall_summary
  const safeOverallSummary = overall_summary || {
    'Total Spends (Debits)': 0,
    'Total Credits': 0,
    'Net Change': 0,
    'Total Transactions': 0
  };

  // Prepare chart data - add safety check
  const pieChartData = (top_categories || []).map((cat, index) => ({
    name: cat.Category,
    value: cat['Total Debit'] || 0,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        📊 Financial Dashboard
      </Typography>

      {/* Filter Info */}
      {filter_info && (filter_info.from_date || filter_info.to_date) && (
        <Alert severity="info" sx={{ mb: 3 }}>
          📅 Filtered Data: {filter_info.from_date || 'Start'} to {filter_info.to_date || 'End'} 
          ({filter_info.total_transactions} transactions)
        </Alert>
      )}

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <TrendingDown color="error" sx={{ mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Spends
                  </Typography>
                  <Typography variant="h5">
                    {formatCurrency(safeOverallSummary['Total Spends (Debits)'])}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <TrendingUp color="success" sx={{ mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Credits
                  </Typography>
                  <Typography variant="h5">
                    {formatCurrency(safeOverallSummary['Total Credits'])}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <AccountBalance color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Net Change
                  </Typography>
                  <Typography 
                    variant="h5" 
                    color={safeOverallSummary['Net Change'] >= 0 ? 'success.main' : 'error.main'}
                  >
                    {formatCurrency(safeOverallSummary['Net Change'])}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Receipt color="info" sx={{ mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Transactions
                  </Typography>
                  <Typography variant="h5">
                    {filter_info.total_transactions}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📈 Top Spending Categories
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🏆 Top Categories
              </Typography>
              {(top_categories || []).map((category, index) => (
                <Box key={category.Category} sx={{ mb: 2 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2">
                      {index + 1}. {category.Category}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {formatCurrency(category['Total Debit'] || 0)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
