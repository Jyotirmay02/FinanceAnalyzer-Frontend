import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api'

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
  
  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const getPortfolioAnalysis = async (analysisId) => {
  const response = await api.get(`/analysis/portfolio/${analysisId}`)
  return response.data
}

export const getCategoryAnalysis = async (analysisId) => {
  const response = await api.get(`/analysis/categories/${analysisId}`)
  return response.data
}

export const getUPIAnalysis = async (analysisId) => {
  const response = await api.get(`/analysis/upi/${analysisId}`)
  return response.data
}

export const getTransactions = async (analysisId) => {
  const response = await api.get(`/transactions/${analysisId}`)
  return response.data
}
