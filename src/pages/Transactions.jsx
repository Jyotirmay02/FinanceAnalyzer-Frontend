import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { formatCurrency } from '../utils/formatters'
import { useTransactions } from '../hooks/useTransactions'
import TransactionFilters from '../components/TransactionFilters'
import TransactionTable from '../components/TransactionTable'

const Transactions = () => {
  const analysisId = localStorage.getItem('current_analysis_id')
  
  const {
    transactions,
    loading,
    error,
    totalPages,
    totalCount,
    totalCredits,
    totalDebits,
    filters,
    filterOptions,
    updateFilters,
    clearFilters,
    refresh
  } = useTransactions(analysisId)

  const handleSort = (field) => {
    const newOrder = filters.sortField === field && filters.sortOrder === 'desc' ? 'asc' : 'desc'
    updateFilters({ 
      sortField: field, 
      sortOrder: newOrder,
      currentPage: 1 
    })
  }

  const handlePageChange = (page) => {
    updateFilters({ currentPage: page })
  }

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export functionality to be implemented')
  }

  if (!analysisId) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-gray-500">No analysis data available. Please upload files first.</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-red-500">Error loading transactions: {error}</p>
          <button 
            onClick={refresh}
            className="mt-4 px-4 py-2 bg-mint-600 text-white rounded-lg hover:bg-mint-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <p className="text-gray-600">View and analyze your transaction history</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <p className="text-sm text-gray-600">Total Transactions</p>
          <p className="text-2xl font-bold text-gray-900">{totalCount.toLocaleString()}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600">Total Credits</p>
          <p className="text-2xl font-bold text-mint-600">
            {formatCurrency(totalCredits)}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600">Total Debits</p>
          <p className="text-2xl font-bold text-expense-600">
            {formatCurrency(totalDebits)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <TransactionFilters
        filters={filters}
        filterOptions={filterOptions}
        onFiltersChange={updateFilters}
        onClearFilters={clearFilters}
        onExport={handleExport}
      />

      {/* Transactions Table */}
      <TransactionTable
        transactions={transactions}
        loading={loading}
        sortField={filters.sortField}
        sortOrder={filters.sortOrder}
        onSort={handleSort}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="card">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {((filters.currentPage - 1) * 50) + 1} to {Math.min(filters.currentPage * 50, totalCount)} of {totalCount} transactions
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(filters.currentPage - 1)}
                disabled={filters.currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        filters.currentPage === page
                          ? 'bg-mint-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  )
                })}
                {totalPages > 5 && (
                  <>
                    <span className="text-gray-500">...</span>
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        filters.currentPage === totalPages
                          ? 'bg-mint-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>

              <button
                onClick={() => handlePageChange(filters.currentPage + 1)}
                disabled={filters.currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Transactions
