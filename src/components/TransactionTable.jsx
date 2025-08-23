import React from 'react'
import { formatCurrency, formatDate } from '../utils/formatters'

const TransactionTable = ({ 
  transactions, 
  loading, 
  sortField, 
  sortOrder, 
  onSort 
}) => {
  const getSortIcon = (field) => {
    if (sortField !== field) return <span className="opacity-50">↕</span>
    return sortOrder === 'asc' ? '↑' : '↓'
  }

  const SortableHeader = ({ field, children, className = "" }) => (
    <th className={`py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}>
      <button 
        onClick={() => onSort(field)}
        className="flex items-center hover:text-gray-700 transition-colors"
      >
        {children}
        <span className="ml-1">{getSortIcon(field)}</span>
      </button>
    </th>
  )

  if (loading) {
    return (
      <div className="card">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint-600"></div>
          <span className="ml-3 text-gray-600">Loading transactions...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <SortableHeader field="date">Date</SortableHeader>
              <SortableHeader field="description">Description</SortableHeader>
              <SortableHeader field="category">Category</SortableHeader>
              <SortableHeader field="bank">Bank</SortableHeader>
              <SortableHeader field="amount" className="text-right">
                <span className="ml-auto flex items-center">
                  Amount
                  <span className="ml-1">{getSortIcon('amount')}</span>
                </span>
              </SortableHeader>
              <SortableHeader field="balance" className="text-right">
                <span className="ml-auto flex items-center">
                  Balance
                  <span className="ml-1">{getSortIcon('balance')}</span>
                </span>
              </SortableHeader>
            </tr>
          </thead>
          <tbody>
            {(transactions || []).map((transaction) => {
              try {
                return (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                        {transaction.description || 'No description'}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {transaction.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {transaction.bank || 'Unknown'}
                    </td>
                    <td className={`py-3 px-4 text-sm font-medium text-right ${
                      (transaction.amount || 0) >= 0 ? 'text-mint-600' : 'text-expense-600'
                    }`}>
                      {formatCurrency(transaction.amount || 0)}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 text-right">
                      {formatCurrency(transaction.balance || 0)}
                    </td>
                  </tr>
                )
              } catch (error) {
                console.error('Error rendering transaction:', error, transaction)
                return (
                  <tr key={transaction.id || Math.random()} className="border-b border-gray-100">
                    <td colSpan="6" className="py-3 px-4 text-sm text-red-600">
                      Error displaying transaction
                    </td>
                  </tr>
                )
              }
            })}
          </tbody>
        </table>

        {(!transactions || transactions.length === 0) && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No transactions found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TransactionTable
