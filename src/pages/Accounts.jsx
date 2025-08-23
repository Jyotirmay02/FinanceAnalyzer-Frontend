import React, { useState, useEffect } from 'react'
import { Plus, Eye, EyeOff, CreditCard, Wallet, TrendingUp, Building, Car } from 'lucide-react'
import { formatCurrency } from '../utils/formatters'

const Accounts = () => {
  const [accounts, setAccounts] = useState([])
  const [showBalances, setShowBalances] = useState(true)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    // Mock Indian bank accounts and financial accounts
    const mockAccounts = [
      // Bank Accounts
      {
        id: 1,
        name: 'SBI Savings Account',
        type: 'savings',
        category: 'banking',
        bank: 'State Bank of India',
        accountNumber: '****1234',
        balance: 125000,
        lastUpdated: '2024-01-20',
        status: 'active',
        icon: 'bank'
      },
      {
        id: 2,
        name: 'HDFC Current Account',
        type: 'checking',
        category: 'banking',
        bank: 'HDFC Bank',
        accountNumber: '****5678',
        balance: 85000,
        lastUpdated: '2024-01-20',
        status: 'active',
        icon: 'bank'
      },
      {
        id: 3,
        name: 'ICICI Salary Account',
        type: 'savings',
        category: 'banking',
        bank: 'ICICI Bank',
        accountNumber: '****9012',
        balance: 45000,
        lastUpdated: '2024-01-19',
        status: 'active',
        icon: 'bank'
      },
      // Credit Cards
      {
        id: 4,
        name: 'HDFC Regalia Credit Card',
        type: 'credit',
        category: 'credit',
        bank: 'HDFC Bank',
        accountNumber: '****3456',
        balance: -25000,
        creditLimit: 200000,
        availableCredit: 175000,
        lastUpdated: '2024-01-20',
        status: 'active',
        icon: 'credit'
      },
      {
        id: 5,
        name: 'SBI SimplyCLICK Card',
        type: 'credit',
        category: 'credit',
        bank: 'State Bank of India',
        accountNumber: '****7890',
        balance: -12000,
        creditLimit: 150000,
        availableCredit: 138000,
        lastUpdated: '2024-01-19',
        status: 'active',
        icon: 'credit'
      },
      // Investment Accounts
      {
        id: 6,
        name: 'Zerodha Demat Account',
        type: 'investment',
        category: 'investment',
        bank: 'Zerodha',
        accountNumber: 'ZD****123',
        balance: 850000,
        lastUpdated: '2024-01-20',
        status: 'active',
        icon: 'investment'
      },
      {
        id: 7,
        name: 'HDFC Mutual Fund',
        type: 'mutual_fund',
        category: 'investment',
        bank: 'HDFC AMC',
        accountNumber: 'MF****456',
        balance: 450000,
        lastUpdated: '2024-01-19',
        status: 'active',
        icon: 'investment'
      },
      {
        id: 8,
        name: 'EPF Account',
        type: 'retirement',
        category: 'investment',
        bank: 'EPFO',
        accountNumber: 'EPF****789',
        balance: 320000,
        lastUpdated: '2024-01-15',
        status: 'active',
        icon: 'investment'
      },
      {
        id: 9,
        name: 'PPF Account - SBI',
        type: 'retirement',
        category: 'investment',
        bank: 'State Bank of India',
        accountNumber: 'PPF****012',
        balance: 180000,
        lastUpdated: '2024-01-10',
        status: 'active',
        icon: 'investment'
      },
      // Loans
      {
        id: 10,
        name: 'Home Loan - HDFC',
        type: 'loan',
        category: 'loan',
        bank: 'HDFC Bank',
        accountNumber: 'HL****345',
        balance: -2850000,
        originalAmount: 3500000,
        lastUpdated: '2024-01-20',
        status: 'active',
        icon: 'loan'
      },
      {
        id: 11,
        name: 'Car Loan - SBI',
        type: 'loan',
        category: 'loan',
        bank: 'State Bank of India',
        accountNumber: 'CL****678',
        balance: -450000,
        originalAmount: 800000,
        lastUpdated: '2024-01-18',
        status: 'active',
        icon: 'loan'
      }
    ]

    setTimeout(() => {
      setAccounts(mockAccounts)
      setLoading(false)
    }, 800)
  }, [])

  const categories = [
    { key: 'all', name: 'All Accounts', count: accounts.length },
    { key: 'banking', name: 'Bank Accounts', count: accounts.filter(a => a.category === 'banking').length },
    { key: 'credit', name: 'Credit Cards', count: accounts.filter(a => a.category === 'credit').length },
    { key: 'investment', name: 'Investments', count: accounts.filter(a => a.category === 'investment').length },
    { key: 'loan', name: 'Loans', count: accounts.filter(a => a.category === 'loan').length }
  ]

  const filteredAccounts = selectedCategory === 'all' 
    ? accounts 
    : accounts.filter(account => account.category === selectedCategory)

  const getAccountIcon = (iconType) => {
    switch (iconType) {
      case 'credit': return <CreditCard className="h-6 w-6" />
      case 'investment': return <TrendingUp className="h-6 w-6" />
      case 'loan': return <Building className="h-6 w-6" />
      default: return <Wallet className="h-6 w-6" />
    }
  }

  const getBalanceColor = (account) => {
    if (account.category === 'loan' || account.category === 'credit') {
      return account.balance < 0 ? 'text-expense-600' : 'text-mint-600'
    }
    return account.balance >= 0 ? 'text-mint-600' : 'text-expense-600'
  }

  const totalNetWorth = accounts.reduce((sum, account) => sum + account.balance, 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mint-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Accounts</h1>
          <p className="text-gray-600">Manage all your financial accounts</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowBalances(!showBalances)}
            className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            {showBalances ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
            {showBalances ? 'Hide' : 'Show'} Balances
          </button>
          <button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Account
          </button>
        </div>
      </div>

      {/* Net Worth Summary */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Total Net Worth</h3>
            <p className="text-3xl font-bold text-mint-600">
              {showBalances ? formatCurrency(totalNetWorth) : '••••••'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">{accounts.length} accounts</p>
            <p className="text-sm text-gray-500">Last updated: Today</p>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setSelectedCategory(category.key)}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedCategory === category.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAccounts.map((account) => (
          <div key={account.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg mr-3 ${
                  account.category === 'banking' ? 'bg-blue-100 text-blue-600' :
                  account.category === 'credit' ? 'bg-purple-100 text-purple-600' :
                  account.category === 'investment' ? 'bg-green-100 text-green-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {getAccountIcon(account.icon)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{account.name}</h4>
                  <p className="text-sm text-gray-500">{account.bank}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                account.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {account.status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  {account.category === 'loan' ? 'Outstanding' : 'Balance'}
                </span>
                <span className={`text-lg font-bold ${getBalanceColor(account)}`}>
                  {showBalances ? formatCurrency(Math.abs(account.balance)) : '••••••'}
                </span>
              </div>

              {account.creditLimit && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Available Credit</span>
                  <span className="text-sm font-medium text-mint-600">
                    {showBalances ? formatCurrency(account.availableCredit) : '••••••'}
                  </span>
                </div>
              )}

              {account.originalAmount && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Original Amount</span>
                  <span className="text-sm text-gray-600">
                    {showBalances ? formatCurrency(account.originalAmount) : '••••••'}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-500">Account: {account.accountNumber}</span>
                <span className="text-xs text-gray-500">Updated: {account.lastUpdated}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAccounts.length === 0 && (
        <div className="text-center py-12">
          <Wallet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No accounts found</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first account</p>
          <button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Account
          </button>
        </div>
      )}
    </div>
  )
}

export default Accounts
