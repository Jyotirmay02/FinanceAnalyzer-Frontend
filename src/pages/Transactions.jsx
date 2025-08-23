import React, { useState, useEffect } from 'react'
import { Search, Filter, Download, ArrowUpDown } from 'lucide-react'
import { formatCurrency, formatDate } from '../utils/formatters'

const Transactions = () => {
  const [transactions, setTransactions] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock transaction data
    const mockTransactions = [
      {
        id: 1,
        date: '2024-01-15',
        description: 'UPI-Bills & Entertainment-Food & Dining-Swiggy',
        amount: -850,
        category: 'Food & Dining',
        broad_category: 'Bills & Entertainment',
        type: 'Debit',
        bank: 'SBI',
        balance: 45000
      },
      {
        id: 2,
        date: '2024-01-14',
        description: 'Salary Credit - Amazon',
        amount: 125000,
        category: 'Salary',
        broad_category: 'Income & Salary',
        type: 'Credit',
        bank: 'SBI',
        balance: 45850
      },
      {
        id: 3,
        date: '2024-01-13',
        description: 'UPI-Shopping-Online Shopping-Amazon',
        amount: -2500,
        category: 'Online Shopping',
        broad_category: 'Shopping',
        type: 'Debit',
        bank: 'SBI',
        balance: 23350
      },
      {
        id: 4,
        date: '2024-01-12',
        description: 'ATM Withdrawal',
        amount: -5000,
        category: 'ATM Withdrawal',
        broad_category: 'Cash & ATM',
        type: 'Debit',
        bank: 'SBI',
        balance: 25850
      },
      {
        id: 5,
        date: '2024-01-11',
        description: 'UPI-Travel-Cab Services-Uber',
        amount: -450,
        category: 'Cab Services',
        broad_category: 'Travel',
        type: 'Debit',
        bank: 'SBI',
        balance: 30850
      }
    ]

    setTimeout(() => {
      setTransactions(mockTransactions)
      setFilteredTransactions(mockTransactions)
      setLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
    let filtered = transactions.filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = filterCategory === 'all' || transaction.broad_category === filterCategory
      return matchesSearch && matchesCategory
    })

    // Sort transactions
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date)
        case 'amount':
          return Math.abs(b.amount) - Math.abs(a.amount)
        case 'category':
          return a.category.localeCompare(b.category)
        default:
          return 0
      }
    })

    setFilteredTransactions(filtered)
  }, [transactions, searchTerm, filterCategory, sortBy])

  const categories = ['all', ...new Set(transactions.map(t => t.broad_category))]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mint-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <p className="text-gray-600">View and filter your transaction history</p>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-mint-500"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-mint-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-mint-500"
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
              <option value="category">Sort by Category</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Description</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Amount</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Balance</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.description.length > 50 
                          ? transaction.description.substring(0, 50) + '...'
                          : transaction.description
                        }
                      </p>
                      <p className="text-xs text-gray-500">{transaction.bank}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {transaction.category}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{transaction.broad_category}</p>
                    </div>
                  </td>
                  <td className={`py-3 px-4 text-right text-sm font-medium ${
                    transaction.amount >= 0 ? 'text-mint-600' : 'text-expense-600'
                  }`}>
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="py-3 px-4 text-right text-sm text-gray-600">
                    {formatCurrency(transaction.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No transactions found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <p className="text-sm text-gray-600">Total Transactions</p>
          <p className="text-2xl font-bold text-gray-900">{filteredTransactions.length}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600">Total Credits</p>
          <p className="text-2xl font-bold text-mint-600">
            {formatCurrency(filteredTransactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0))}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600">Total Debits</p>
          <p className="text-2xl font-bold text-expense-600">
            {formatCurrency(Math.abs(filteredTransactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0)))}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Transactions
