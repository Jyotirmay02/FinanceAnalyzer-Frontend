import { useState, useEffect, useCallback } from 'react'
import TransactionService from '../services/TransactionService'

export const useTransactions = (analysisId) => {
  const [state, setState] = useState({
    transactions: [],
    loading: true,
    error: null,
    totalPages: 1,
    totalCount: 0,
    totalCredits: 0,
    totalDebits: 0
  })

  const [filters, setFilters] = useState({
    searchTerm: '',
    filterCategory: 'all',
    filterType: 'all',
    filterBank: 'all',
    sortField: 'date',
    sortOrder: 'desc',
    currentPage: 1
  })

  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    banks: []
  })

  const loadTransactions = useCallback(async () => {
    if (!analysisId) return

    try {
      setState(prev => ({ ...prev, loading: true, error: null }))

      const options = {
        page: filters.currentPage,
        pageSize: 50,
        category: filters.filterCategory,
        transactionType: filters.filterType.toLowerCase(),
        search: filters.searchTerm,
        bank: filters.filterBank,
        sortField: filters.sortField,
        sortOrder: filters.sortOrder
      }

      const [transactionData, summaryData] = await Promise.all([
        TransactionService.getTransactions(analysisId, options),
        TransactionService.getTransactionSummary(analysisId, {
          category: filters.filterCategory,
          transactionType: filters.filterType.toLowerCase(),
          search: filters.searchTerm,
          bank: filters.filterBank
        })
      ])

      setState(prev => ({
        ...prev,
        transactions: transactionData.transactions || [],
        totalPages: transactionData.total_pages || 1,
        totalCount: summaryData.totalCount,
        totalCredits: summaryData.totalCredits,
        totalDebits: summaryData.totalDebits,
        loading: false
      }))

    } catch (error) {
      console.error('Error loading transactions:', error)
      setState(prev => ({
        ...prev,
        error: error.message,
        loading: false,
        transactions: []
      }))
    }
  }, [analysisId, filters])

  const loadFilterOptions = useCallback(async () => {
    if (!analysisId) return

    try {
      const options = await TransactionService.getFilterOptions(analysisId)
      setFilterOptions(options)
    } catch (error) {
      console.error('Error loading filter options:', error)
    }
  }, [analysisId])

  useEffect(() => {
    loadFilterOptions()
  }, [loadFilterOptions])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadTransactions()
    }, filters.searchTerm ? 300 : 0) // Debounce search

    return () => clearTimeout(timeoutId)
  }, [loadTransactions])

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      currentPage: newFilters.currentPage || 1
    }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({
      searchTerm: '',
      filterCategory: 'all',
      filterType: 'all',
      filterBank: 'all',
      sortField: 'date',
      sortOrder: 'desc',
      currentPage: 1
    })
  }, [])

  return {
    ...state,
    filters,
    filterOptions,
    updateFilters,
    clearFilters,
    refresh: loadTransactions
  }
}
