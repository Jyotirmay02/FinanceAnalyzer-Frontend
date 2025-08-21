import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Alert,
  CircularProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import {
  AccountBalance,
  TrendingUp,
  TrendingDown,
  SwapHoriz,
  Category
} from '@mui/icons-material';
import axios from 'axios';

const PortfolioAnalysis = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const analysisId = localStorage.getItem('current_analysis_id');
        if (!analysisId) {
          setError('No analysis found. Please upload files first.');
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:8000/api/analysis/portfolio/${analysisId}`);
        setPortfolioData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load portfolio analysis');
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

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
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error || !portfolioData?.portfolio_insights) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error">
          {error || portfolioData?.error || 'No portfolio data available'}
        </Alert>
      </Container>
    );
  }

  const insights = portfolioData.portfolio_insights;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Portfolio Analysis
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          {insights.note}
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        {/* Portfolio Overview */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <AccountBalance color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Portfolio Overview</Typography>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Total Transactions
                  </Typography>
                  <Typography variant="h6">
                    {insights.total_transactions?.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    External Transactions
                  </Typography>
                  <Typography variant="h6">
                    {insights.external_transactions?.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
              
              <Box mt={2}>
                <Chip
                  icon={<SwapHoriz />}
                  label={`${insights.self_transfers_ignored} Self-Transfers Ignored`}
                  color="secondary"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Financial Flow */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                External Cash Flow
              </Typography>
              
              <Box mb={2}>
                <Box display="flex" alignItems="center" mb={1}>
                  <TrendingUp color="success" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="textSecondary">
                    External Inflows
                  </Typography>
                </Box>
                <Typography variant="h6" color="success.main">
                  {formatCurrency(insights.external_inflows || 0)}
                </Typography>
              </Box>
              
              <Box mb={2}>
                <Box display="flex" alignItems="center" mb={1}>
                  <TrendingDown color="error" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="textSecondary">
                    External Outflows
                  </Typography>
                </Box>
                <Typography variant="h6" color="error.main">
                  {formatCurrency(insights.external_outflows || 0)}
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Net Portfolio Change
                </Typography>
                <Typography 
                  variant="h5" 
                  color={insights.net_portfolio_change >= 0 ? 'success.main' : 'error.main'}
                >
                  {formatCurrency(insights.net_portfolio_change || 0)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Spending Categories */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Category color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Top Spending Categories</Typography>
              </Box>
              
              {insights.top_spending_categories && insights.top_spending_categories.length > 0 ? (
                <List>
                  {insights.top_spending_categories.map((category, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
                        <ListItemText
                          primary={category.category}
                          secondary={formatCurrency(category.amount)}
                        />
                        <Typography variant="body2" color="textSecondary">
                          #{index + 1}
                        </Typography>
                      </ListItem>
                      {index < insights.top_spending_categories.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No spending categories available
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Analysis Type Info */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Analysis Information
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Analysis Type: <strong>{insights.analysis_type}</strong>
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                This portfolio analysis provides a comprehensive view of your financial activity 
                across multiple accounts while intelligently filtering out internal transfers 
                to show only true external income and expenses.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PortfolioAnalysis;
