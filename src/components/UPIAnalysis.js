import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Alert,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
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

function UPIAnalysis() {
  const [upiData, setUpiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUpiData();
  }, []);

  const fetchUpiData = async () => {
    try {
      setLoading(true);
      
      // Get analysis_id from localStorage
      const analysisId = localStorage.getItem('current_analysis_id');
      if (!analysisId) {
        setError('No analysis found. Please upload a file first.');
        setLoading(false);
        return;
      }

      const response = await axios.get(`http://localhost:8000/api/analysis/upi/${analysisId}`);
      setUpiData(response.data.upi_analysis);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load UPI data');
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

  if (!upiData || !upiData.upi_hierarchy || Object.keys(upiData.upi_hierarchy).length === 0) {
    return (
      <Alert severity="info" sx={{ mb: 2 }}>
        No UPI data available. Please upload a file with UPI transactions to get started.
      </Alert>
    );
  }

  // Prepare chart data from hierarchy
  const hierarchyData = Object.entries(upiData.upi_hierarchy || {}).map(([category, data], index) => ({
    name: category,
    value: data.total_debit || 0,
    count: Object.values(data.subcategories || {}).reduce((sum, sub) => sum + (sub.count || 0), 0),
    color: COLORS[index % COLORS.length],
  })).filter(item => item.value > 0 || item.count > 0);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        🏦 UPI Analysis
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total UPI Transactions
              </Typography>
              <Typography variant="h4">
                {upiData.total_upi_transactions || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total UPI Spending
              </Typography>
              <Typography variant="h4">
                {formatCurrency(upiData.total_upi_debit || 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                UPI Categories
              </Typography>
              <Typography variant="h4">
                {Object.keys(upiData.upi_hierarchy || {}).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Avg per Transaction
              </Typography>
              <Typography variant="h4">
                {upiData.total_upi_transactions > 0 
                  ? formatCurrency((upiData.total_upi_debit || 0) / upiData.total_upi_transactions)
                  : formatCurrency(0)
                }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Charts */}
        {hierarchyData.length > 0 && (
          <>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    📊 UPI Category Spending
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={hierarchyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis formatter={(value) => `₹${(value/1000).toFixed(0)}K`} />
                      <Tooltip 
                        formatter={(value, name) => [
                          name === 'value' ? formatCurrency(value) : value,
                          name === 'value' ? 'Amount' : 'Transactions'
                        ]} 
                      />
                      <Bar dataKey="value" fill="#0088FE" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    🥧 Transaction Distribution
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={hierarchyData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => 
                          percent > 5 ? `${name} ${(percent * 100).toFixed(0)}%` : ''
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {hierarchyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} transactions`, 'Count']} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}

        {/* Hierarchical Breakdown */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🌳 UPI Category Breakdown
              </Typography>
              {Object.entries(upiData.upi_hierarchy || {}).map(([category, data]) => (
                <Accordion key={category}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box display="flex" alignItems="center" width="100%">
                      <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {category}
                      </Typography>
                      <Chip 
                        label={`${Object.values(data.subcategories || {}).reduce((sum, sub) => sum + (sub.count || 0), 0)} transactions`}
                        color="primary" 
                        size="small"
                        sx={{ mr: 2 }}
                      />
                      <Typography variant="body2" color="textSecondary">
                        {formatCurrency(data.total_debit || 0)}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {Object.entries(data.subcategories || {}).map(([subcat, subdata]) => (
                        <ListItem key={subcat}>
                          <ListItemText
                            primary={subcat}
                            secondary={`${subdata.count || 0} transactions • ${formatCurrency(subdata.total_debit || 0)}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UPIAnalysis;
