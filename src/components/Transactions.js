import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  TextField,
  Grid,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import axios from 'axios';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, [page, search, category]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      
      // Get analysis_id from localStorage
      const analysisId = localStorage.getItem('current_analysis_id');
      if (!analysisId) {
        setError('No analysis found. Please upload a file first.');
        setLoading(false);
        return;
      }

      const response = await axios.get(`http://localhost:8000/api/transactions/${analysisId}`);
      setTransactions(response.data.transactions || []);
      setTotalPages(1); // For now, since we're showing first 100 only
      setError(null);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('en-IN');
    } catch {
      return dateStr;
    }
  };

  const getCategoryColor = (category) => {
    if (!category) return 'default';
    if (category.startsWith('UPI-')) return 'primary';
    if (category.includes('Transfer')) return 'secondary';
    if (category.includes('Investment')) return 'success';
    if (category.includes('Shopping')) return 'warning';
    return 'default';
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  if (loading && transactions.length === 0) {
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

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        📋 Transactions
      </Typography>

      {/* WIP Banner */}
      <Alert severity="info" sx={{ mb: 3 }}>
        🚧 <strong>Work in Progress:</strong> Currently showing first 20 transactions only. 
        Pagination and advanced filtering features coming soon!
      </Alert>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Search transactions"
                placeholder="Search by description..."
                value={search}
                onChange={handleSearchChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Filter by category"
                placeholder="Enter category name..."
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Transaction History
          </Typography>
          
          {transactions.length === 0 ? (
            <Alert severity="info">
              No transactions found. Please upload a file to get started.
            </Alert>
          ) : (
            <>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Date</strong></TableCell>
                      <TableCell><strong>Description</strong></TableCell>
                      <TableCell><strong>Category</strong></TableCell>
                      <TableCell align="right"><strong>Debit</strong></TableCell>
                      <TableCell align="right"><strong>Credit</strong></TableCell>
                      <TableCell align="right"><strong>Balance</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.map((transaction, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {formatDate(transaction['Txn Date'] || transaction['Value Date'])}
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ maxWidth: 300 }}>
                            {transaction.Description || 'N/A'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={transaction.Category || 'Uncategorized'}
                            color={getCategoryColor(transaction.Category)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="right" sx={{ color: 'error.main' }}>
                          {transaction['Debit'] ? formatCurrency(transaction['Debit']) : ''}
                        </TableCell>
                        <TableCell align="right" sx={{ color: 'success.main' }}>
                          {transaction['Credit'] ? formatCurrency(transaction['Credit']) : ''}
                        </TableCell>
                        <TableCell align="right">
                          {transaction['Balance'] ? formatCurrency(transaction['Balance']) : ''}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination */}
              <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default Transactions;
