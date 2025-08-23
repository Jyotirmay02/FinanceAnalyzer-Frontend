import axios from 'axios'

const API_BASE_URL = 'http://localhost:8001/api/v2'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const uploadFiles = async (files) => {
  const formData = new FormData()
  files.forEach((file) => {
    formData.append('files', file)
  })
  
  const response = await api.post('/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const getDashboard = async (analysisId) => {
  const response = await api.get(`/dashboard/${analysisId}`)
  return response.data
}

export const getCategories = async (analysisId) => {
  const response = await api.get(`/categories/${analysisId}`)
  return response.data
}

export const getUPIAnalysis = async (analysisId) => {
  const response = await api.get(`/upi-analysis/${analysisId}`)
  return response.data
}

// NEW APIs for missing sections
export const getAccountBalances = async (analysisId) => {
  const response = await api.get(`/accounts/${analysisId}`)
  return response.data
}

export const getMonthlyTrend = async (analysisId) => {
  const response = await api.get(`/monthly-trend/${analysisId}`)
  return response.data
}

export const getBudgetProgress = async (analysisId) => {
  const response = await api.get(`/budget-progress/${analysisId}`)
  return response.data
}

export const getUpcomingBills = async (analysisId) => {
  const response = await api.get(`/upcoming-bills/${analysisId}`)
  return response.data
}

export const getTransactions = async (analysisId, options = {}) => {
  const { page = 1, pageSize = 50, category, transactionType, search } = options
  
  const params = new URLSearchParams({
    page: page.toString(),
    page_size: pageSize.toString()
  })
  
  if (category) params.append('category', category)
  if (transactionType) params.append('transaction_type', transactionType)
  if (search) params.append('search', search)
  
  const response = await api.get(`/transactions/${analysisId}?${params}`)
  return response.data
}

// Legacy compatibility
export const getPortfolioAnalysis = getDashboard
export const getCategoryAnalysis = getCategories
