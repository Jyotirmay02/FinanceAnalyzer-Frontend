import { api } from './api'

class TransactionService {
  constructor() {
    this.cache = new Map()
  }

  async getTransactions(analysisId, options = {}) {
    const {
      page = 1,
      pageSize = 50,
      category,
      transactionType,
      search,
      bank,
      sortField,
      sortOrder
    } = options

    const params = new URLSearchParams({
      page: page.toString(),
      page_size: pageSize.toString()
    })

    if (category && category !== 'all') params.append('category', category)
    if (transactionType && transactionType !== 'all') params.append('transaction_type', transactionType)
    if (search) params.append('search', search)

    try {
      const response = await api.get(`/transactions/${analysisId}?${params}`)
      
      // Apply client-side bank filtering if needed (since backend doesn't support it)
      let transactions = response.data.transactions || []
      if (bank && bank !== 'all') {
        transactions = transactions.filter(t => t.bank === bank)
      }

      // Apply client-side sorting if needed
      if (sortField) {
        transactions = this.sortTransactions(transactions, sortField, sortOrder)
      }

      return {
        ...response.data,
        transactions
      }
    } catch (error) {
      console.error('Error fetching transactions:', error)
      throw error
    }
  }

  sortTransactions(transactions, field, order = 'desc') {
    return [...transactions].sort((a, b) => {
      let aVal, bVal

      switch (field) {
        case 'date':
          aVal = new Date(a.date)
          bVal = new Date(b.date)
          break
        case 'description':
          aVal = a.description?.toLowerCase() || ''
          bVal = b.description?.toLowerCase() || ''
          break
        case 'category':
          aVal = a.category?.toLowerCase() || ''
          bVal = b.category?.toLowerCase() || ''
          break
        case 'bank':
          aVal = a.bank?.toLowerCase() || ''
          bVal = b.bank?.toLowerCase() || ''
          break
        case 'amount':
          aVal = Math.abs(a.amount || 0)
          bVal = Math.abs(b.amount || 0)
          break
        case 'balance':
          aVal = a.balance || 0
          bVal = b.balance || 0
          break
        default:
          return 0
      }

      if (aVal < bVal) return order === 'asc' ? -1 : 1
      if (aVal > bVal) return order === 'asc' ? 1 : -1
      return 0
    })
  }

  async getTransactionSummary(analysisId, filters = {}) {
    // Get a larger sample to calculate accurate totals
    const summaryData = await this.getTransactions(analysisId, {
      ...filters,
      page: 1,
      pageSize: 1000
    })

    const transactions = summaryData.transactions || []
    
    return {
      totalCount: summaryData.total_count || 0,
      totalCredits: transactions
        .filter(t => (t.amount || 0) > 0)
        .reduce((sum, t) => sum + (t.amount || 0), 0),
      totalDebits: Math.abs(transactions
        .filter(t => (t.amount || 0) < 0)
        .reduce((sum, t) => sum + (t.amount || 0), 0))
    }
  }

  async getFilterOptions(analysisId) {
    const cacheKey = `filters_${analysisId}`
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    try {
      // Get first page to determine total pages
      const firstPage = await this.getTransactions(analysisId, { page: 1, pageSize: 100 })
      const totalPages = firstPage.total_pages || 1
      
      // Sample from beginning, middle, and end of dataset
      const pagesToSample = [
        1,
        Math.floor(totalPages / 2),
        totalPages
      ].filter((page, index, arr) => arr.indexOf(page) === index) // Remove duplicates

      const pagePromises = pagesToSample.map(page => 
        this.getTransactions(analysisId, { page, pageSize: 200 })
      )

      const pages = await Promise.all(pagePromises)
      const allTransactions = pages.flatMap(page => page.transactions || [])

      const options = {
        categories: [...new Set(allTransactions.map(t => t.category))].sort(),
        banks: [...new Set(allTransactions.map(t => t.bank))].sort()
      }

      this.cache.set(cacheKey, options)
      return options
    } catch (error) {
      console.error('Error fetching filter options:', error)
      return { categories: [], banks: [] }
    }
  }

  clearCache() {
    this.cache.clear()
  }
}

export default new TransactionService()
