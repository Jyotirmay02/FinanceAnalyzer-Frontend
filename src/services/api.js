import axios from 'axios'

const API_BASE_URL = 'http://localhost:8001/api/v2'

const api = axios.create({
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

export const getTransactions = async (analysisId, params = {}) => {
  const response = await api.get(`/transactions/${analysisId}`, { params })
  return response.data
}

export const getUPIAnalysis = async (analysisId) => {
  const response = await api.get(`/upi-analysis/${analysisId}`)
  return response.data
}

// Legacy compatibility
export const getPortfolioAnalysis = getDashboard
export const getCategoryAnalysis = getCategories
